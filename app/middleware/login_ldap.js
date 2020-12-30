const ldap = require('ldapjs');
let cfg = require('../config/db.config')
const jwt = require("jsonwebtoken");

/* const db = require("../models/index");
 */
module.exports.login_ldap = (req, res, next) => { 
    let username = req.body.username; let password = req.body.password;
    let dn = 'uid=' + username + ',' + cfg.users;
    var profile;
    let ldapclient = ldap.createClient({ url: cfg.url, timeout: 5000, connectTimeout: 10000, reconnect: true });
    ldapclient.bind(dn, password, function (err) {
        if (err) {
            console.log(err.message);
            res.send(err);
        } else {
            console.log('---- connected to ldap ----');
            let opts = {
                filter: "(&(objectClass=user))",
                scope: "sub",
                client: "*",
                attributes: ['objectGUID', 'sAMAccountName', 'cn', 'mail', 'manager', 'memberOf']
            };
            ldapclient.search(dn, opts, function (err, ldapres) {
                ldapres.on('searchEntry', function (entry) {
                     //console.log('entry: ' + JSON.stringify(entry.object));
                    let obj = entry.object;
                    let isAdmin = false; let isGuest = false;  //console.log(obj);
                    
                    let group_members = [];// filtring groups
                    if (obj.memberOf.constructor === Array)
                        group_members = obj.memberOf
                    else
                        group_members.push(obj.memberOf);
                    let groups = group_members.filter(function (arrayElement) {
                        return arrayElement.indexOf(cfg.base) == arrayElement.length - cfg.base.length;
                    });
                    // removing useless strings
                    for (let i = 0; i < groups.length; i++) {
                        groups[i] = groups[i].replace(',' + cfg.ldap.groups, '');
                        groups[i] = groups[i].replace("cn=", '');
                        if (groups[i] === cfg.admin_group) isAdmin = true;
                        if (groups[i] === cfg.chief_group) isGuest = true;
                    }
 
                    // creating profile
                    profile = {
                        dn: obj.dn,
                        ipaUniqueID: obj.ipaUniqueID,
                        krbPrincipalName: obj.krbPrincipalName,
                        uid: obj.uid,
                        displayName: obj.displayName,
                        mobile: obj.mobile,
                        mail: obj.mail,
                        uidNumber: obj.uidNumber,
                        gidNumber: obj.gidNumber,
                        groups: groups,
                        loginShell: obj.loginShell,
                        homeDirectory: obj.homeDirectory,
                        krbExtraData: obj.krbExtraData,
                        krbLastSuccessfulAuth: obj.krbLastSuccessfulAuth,
                        krbLastFailedAuth: obj.krbLastFailedAuth,
                        krbLoginFailedCount: obj.krbLoginFailedCount,
                        isAdmin: isAdmin,
                        isGuest: isGuest
                    };
                    res.send({
                        id_token: jwt.sign(profile, cfg.secret, { expiresIn: "1 day" })
                    });
                });
                ldapres.on('searchReference', function (referral) {
                    console.log('referral: ' + referral.uris.join());
                    ldapclient.unbind();
                    res.send(referral.uris.join());
                });
                ldapres.on('error', function (err) {
                    console.error('error: ' + err.message);
                    ldapclient.unbind();
                    res.send(+err);
                });
                ldapres.on('end', function (result) {
                    console.log('ldap: User "' + username + '" login with status ' + result.status);
                    ldapclient.unbind();
                });
            });
        }
    });

}