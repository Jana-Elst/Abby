# 🧐 What is this!?
Integration 4 - school project in collab with Abby (Kortrijk)

## 🧠 Moedige poging a.k.a our team
### UX
- coordinator: Louisa

### DESIGN
- coordinator: Henri

### DEVELOPMENT
- coordinator: Jana

### GENERAL
- coordinator: Esther
  
- Esther: completer finisher, monitor evaluator, plant 🌱
- Jana: teamworker, implementer, plant 🌱
- Lou: shaper, specialist, plant 🌵
- Henri: completer finisher, plant 🪴

## 🕮 Our 'Moedige poging' bible a.k.a agreements 
1. Everyone shall work at their own pace and time, but the agreed upon tasks should be done by a determined deadline
2. We shall keep each other up to date during a 15 min call each day
⁠3. Everyone shall be open about what they are working and notify if they need help
4. Everyone shall trust one another and don’t put all the workload on themselves or push it to someone else
5. We shall meet each monday and each coordinator has prepared what they want to do that week and what/who they need that week and we make a todo list and planning together

## 🔗 The results of our brave attemps a.k.a links
- [FigJam](https://www.figma.com/board/rqLcQIAwztlIxRn99Nfgoo/Integration-4---Abby?node-id=0-1&t=eH0gQdASVswjV9uo-1)
- [Microsite prototype](https://www.figma.com/design/QP0qeSCZBHvE91DGuCpKpd/Integration-4---Abby---microsite?node-id=0-1&t=6qjMP6iY6mcM78YD-1)
- [Design prototype](https://www.figma.com/design/OffShGGejDTdRazWGSZGpS/Integration-4---Abby---design?node-id=10-2&t=SKmK4pJqmYBHhgyj-1)
- [The final website]()

## Everything you need to know about the dev part of the project
### Tools used
* **Software**
    * **React router** - Our website has a lot of different states (and some different pages), so we decided to make everything in react router.

    * **Arduino IDE** - We have a physical part attached to the concept. To make that part up and running, we used an arduino.

    * **WebSockets** - The arduinos gets real-time data from a database. With a websocket server and we could make this work.

    * **Supabase** - For our database we made use of supabase. It's a database where it is easy to get real-time updates in our server.

* **Hardware**
    * Arduino nano IOT
    * Steppermotor 28byj-48
    * Button or micro switch
    * Led matrix 
    * Led strip
    * one laptop to run the server
    * one smartphone to run the website

### The database

### The arduino(s) & the websocket server
#### Database -> Server --> Arduinos
When something is changing in the database (table Clocks), the websocket server receives a message from the database and send it to the right arduino.

We made the 
SCHEMA!!!!

#### The arduino
Schema van arduino schakeling

Say that its really scalable due the arduinos are connected over the internet

#### HOW TO SETUP?

### Our website
**ENV-file**


### SET BY SET GUIDE