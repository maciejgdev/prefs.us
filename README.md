# prefs.us

Website: https://prefs.us

## A Short-Lived Disposable Settings API

Demo apps, mock ups, proofs of concept... Sometimes we just need a quick way to persist some data without getting into creating a dedicated data store. Or maybe we just don't want to pollute an existing storage with temporary data that is ephemeral in nature and we only need for a short little while. 

The idea is to be able to quickly store and retrieve short-lived data with minimum fuss. With that goal in mind, the API was designed to be as frictionless as possible. Basically obtain an API key and use read and write endpoints. No logins, no sign ups - just you and your data that will delete itself when you forget about it.

* No accounts. No logins.
* Set TTL on any piece of data.
* Inactive data purged automatically.
* Organize your data by projects, domains, lists.
* All data is encrypted.

To save data

    https://prefs.us/write

To retrieve data

    https://prefs.us/read


## Javascript Library

<br/>

Include prefs.us Javascript library in your project

``` html
    <script src="https://prefs.us/prefs.us.min.js"></script>
```

<br/>

Get the API key ready. All data will be linked to that key. Get as many keys as you need.
The method below will either return the existing key or create a new one.
 
``` js
    const apikey = prefs_us.getkey('choosen-key-id', 'choosen-seed-phrase');
```

<br/>

Use ```.using(apikey)``` method to specify the API key if already have one pre-generated.

 
``` js
    prefs_us.using('...apikey...');
```

## Write data example.

See also: [Writing data with prefs.us](https://prefs.us/writeapi)

``` js
const data = "base64abcd...";

prefs_us.using("...apikey...");
prefs_us.post(data);
```

## Read data example

See also: [Retrieving data with prefs.us](https://prefs.us/readapi)

``` js
const apiKey = prefs_us.using("...apikey...");
prefs_us.read()
    .then(response.json())
    .then((data) => {
        console.log(data.values);
    })
    .catch( (error) => {
        callback(error);
    });
```