const prefs_us = {
        __prefs_us : {
        status      : null,
        lastError   : null,
        key         : null,
        ttl         : null,
        domain      : '',
        subdomain   : '',
        project     : '',
        name        : '',
        type        : '',
        list        : '',
        vars        : '',
        option      : 
        {
            readjson: false
        },
        inflate : function(s) {
            if (this.ttl!==null)     s = s + "&ttl="       + this.ttl;
            if (this.domain!=='')    s = s + "&domain="    + this.domain;
            if (this.subdomain!=='') s = s + "&subdomain=" + this.subdomain;
            if (this.project!=='')   s = s + "&project="   + this.project;
            if (this.list!=='')      s = s + "&list="      + this.list;
            if (this.type!=='')      s = s + "&type="      + this.type;
            return s;
        }
    },
    using : function(key) {
        this.__prefs_us.key = key;
    },
    getkey : function(keyname, seed, callback = null) {
        fetch("https://prefs.us/getkey/?user="+keyname+"&seed="+seed, { method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            this.using(data.token);
            if (callback !== null) { 
                callback(data);
            }
        })
        .catch( (error) => {
            if (callback !== null) { 
                callback(error);
            }
        });
        return this;
    },
    ttl : function(days) {
        this.__prefs_us.ttl = days;
        return this;
    },
    project : function(p) {
        this.__prefs_us.project = p;
        return this;
    },
    domain : function(d) {
        this.__prefs_us.domain = d;
        return this;
    },
    subdomain : function(s) {
        this.__prefs_us.subdomain = s;
        return this;
    },
    type : function(t) {
        this.__prefs_us.type = t;
        return this;
    },
    list : function(l) {
        this.__prefs_us.list = l;
        return this;
    },
    name : function(n) {
        this.__prefs_us.name = n;
        return this;
    },
    key : function() {
        return __prefs_us.key;
    },
    find : function(kv) {
        this.__prefs_us.vars = kv;
        return this;
    },
    for : function(kv) {
        this.__prefs_us.vars = kv;
        return this;
    },
    read : function(callback = null) {
        let url = this.__prefs_us.inflate("https://prefs.us/read/?key="+this.__prefs_us.key+"&"+this.__prefs_us.vars);
        this.__prefs_us.vars = ''; 
        if (callback == null) {
            return fetch(url, { method: 'GET' });
        } else {
            fetch(url, { method: 'GET' })
            .then(response => this.__prefs_us.option.readjson ? response.json() : response.text())
            .then((data) => {
                if (callback !== null) {
                    callback(data);
                }
                return data;
            })
            .catch( (error) => {
                if (callback !== null) { 
                    callback(error);
                }
            });
        }
    },
    write : function(data, callback = null) {
        let url = this.__prefs_us.inflate("https://prefs.us/write/?key="+this.__prefs_us.key);
        let encoded = encodeURIComponent(data).replace(/%3D/g, '=');
        fetch(url + "&" + encoded, { method: 'GET' })
        .then(response => response.json())
        .then((success) => {
            if (callback !== null) {
                callback(success);
            }
        })
        .catch((error) => {
            if (callback !== null) { 
                callback(error);
            }
        });
        return this; // TODO: return Promise instead?
    },
    post : function(data, callback = null) {
        let url = this.__prefs_us.inflate("https://prefs.us/write/?key="+this.__prefs_us.key);
        // do not url encode raw POST data
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: data
        })
        .then(response => response.json())
        .then((success) => {
            if (callback !== null) {
                callback(success);
            }
        })
        .catch((error) => {
            if (callback !== null) {
                callback(error);
            }
        });
    },
    test : function(m) {
        alert(m);
    },
    option : function() {
        return this.__prefs_us.option;
    }
}
