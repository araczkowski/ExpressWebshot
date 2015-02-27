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
```bash
$ npm install
```

**Add Web app to app folder**
```bash
$ cp <web_app_dist> /app
```
**Node serve**
```javascript
$ node app.js
```

**Test Web app**
```javascript
url: http://localhost:3000/
```

**Browser or curl**
```javascript
url: http://localhost:3000/shot
 $ curl -w "@curl-format.txt" -o image.png http://localhost:3000/shot > time.txt
```


Work with PM2 
===========================

## Start an application

```bash
$ pm2 start pm2-app.json
```

## Main features

### Process management

Once app is started you can list and manage is easily:

![Process listing](https://raw.githubusercontent.com/araczkowski/ExpressWebshot/master/doc/pm2-list.png)

Listing all running processes:

```bash
$ pm2 list
```

Managing the processes is straightforward:

```bash
$ pm2 stop     node-express-webshot-app
$ pm2 restart  node-express-webshot-app
$ pm2 delete   node-express-webshot-app
```

To have more details on the process:

![Process details](https://raw.githubusercontent.com/araczkowski/ExpressWebshot/master/doc/pm2-desc.png)


```bash
$ pm2 desc node-express-webshot-app
```

### Monitoring

![Monit](https://raw.githubusercontent.com/araczkowski/ExpressWebshot/master/doc/pm2-monit.png)

Monitoring the processe:

```bash
$ pm2 monit node-express-webshot-app
```

### Log facilities

![Monit](https://raw.githubusercontent.com/araczkowski/ExpressWebshot/master/doc/pm2-logs.png)

Displaying logs of a specified process or all processes, in real time:

```bash
$ pm2 logs node-express-webshot-app
$ pm2 flush          # Clear all the logs
```

### Load balancing / 0s reload downtime

When an app is started with the -i <worker number> option, the **cluster** mode is enabled.

**Warning**: It's still a beta feature. If you want to use the embed cluster module or reload with 0s downtime, PM2 recommend the use of node#0.12.0+ node#0.11.16+ or io.js#1.0.2+. They do not support node#0.1$ 0.* cluster module anymore!

With the cluster mode, PM2 enables load balancing between each worker.
Each HTTP/TCP/UDP request will be forwarded to one specific process at a time.

```bash
$ pm2 start pm2-app.json -i max  # Enable load-balancer and cluster features

$ pm2 reload node-express-webshot-app           # Reload the apps in 0s manner
```

### Startup script generation

PM2 can generate and configure a startup script to keep PM2 and the process alive at every server restart.

```bash
$ pm2 startup
# auto-detect platform
$ pm2 startup [platform]
# render startup-script for a specific platform, the [platform] could be one of:
#   ubuntu|centos|redhat|gentoo|systemd|darwin|amazon
```

To save a process list just do:

```bash
$ pm2 save
```

### Update the node-express-webshot-app 

TODO



Using with any Web app 
===========================
## Image parameters in url
http://localhost:3000/shot/?params={"image":{"height":"40"}}

```javascript
{  
   "image":{  
      "height":"40"
   }
}
```


Using with the ClickableBlocks Web app 
===========================

the app repo
https://github.com/araczkowski/ClickableBlocks

## Sample general options

```javascript
{  
   "options":{  
      "min":360,
      "max":1140,
      "mode":"real"
   }
}
```

## Sample schedule definition

```javascript
{  
   "schedule":{  
      "blocks":[  
         {  
            "id":1,
            "start":480,
            "value":60,
            "planned":"1",
            "real":"1"
         }
      ],
      "meal":"1",
      "rmeal":"1"
   }
}

## Sample URL

```javascript
http://localhost:3000/shot/?params={"options":{"min":360,"max":1140,"mode":"real"},"schedule":{"blocks":[{"id":1,"start":480,"value":60,"planned":"1","real":"1"}],"meal":"1","rmeal":"1"},"image":{"height":"40"}}
```
