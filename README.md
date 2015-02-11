ExpressWebshot
===================

An experimental Node.js app, which can be used to provide a webpage images to Oracle BIP reports.
The app is able to:

* take a website screenshots (on server side)
* send the screenshot back to the caller (for example BIP)


![alt tag](https://raw.githubusercontent.com/araczkowski/ExpressWebshot/master/doc/Schedules%20in%20BIP%20reports.png)



How To Start
===========================

**NPM**
```javascript
npm install
```

**Web app**
```javascript
cp <your_web_app> /app
```
**Node serve**
```javascript
node app.js
```

**Test Web app**
```javascript
url: http://localhost:3000/
```

**Browser or curl**
```javascript
url: http://localhost:3000/shot
curl -w "@curl-format.txt" -o image.png http://localhost:3000/shot > time.txt
```




