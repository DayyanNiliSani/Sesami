# Sesami Test

I will try to explain my code as much as possible in this README file. I took me about 6 hours to finish this project without writing this file as I had most of the code that i write in this project from my previous projects completely.
For this test I used NestJs alongside TypeOrm cause in my experience they are the most mature combination for scalable projects in NodeJS environment.

## Structure of Project

In this project I tried to use a clean architecture with 4 layers which are as follows:

- **`Domain Layer`:** I believe It's pretty obvious what it is. Usually I try to keep this as pure as possible which mean this layer shouldn't depend on any library or framework, but at the start of the project I feared that couldn't finish the project in time so I chose the easy way out.
- **`Infra Layer`**: The infrastructure classes like database connections or redis connections are implemented here. for this layer I decided to used repository pattern.
- **`Service Layer`**: This Layer is used as a worker and abstractions to separate the application layer from Infra layer.
  each class of this layer might even depend on multiple classes of Infra Layer
- **`App Layer`**: This Layer is for handling the users requests and responses and building up the projects

## Changes

One of the requirements which was stated in the assignment was as follows
`Design your system to be as realistic and production-ready as possible`
Everything that I did in this project is based of this requirement.
In the assignment, it was stated that the body of request should be like this

```json
{
    "id": Int,
    "start": Date,
    "end": Date,
    "createdAt": Date,
    "updatedAt": Date
}
```

I removed 3 of the parameters which were in request body and for each I have reason.
First let's talk about the id. lets image user1 has created 3 appointments and after that user2 has created 3 more appointments. Now user1 , not knowing anything about the action that user2 made, think the smallest id which he should choose for creating an appointment is 4 and id of 4 is already taken by user2 appointment. So users need to know the latest state of system to know which id should they use. Even if I create an endpoint which solve this problem, some malicious users could use some id other the smallest id which I tell them. So the easiest way to handle this issue is to let the database do the job for us and use auto generate fields.
Now lets talk about createdAt and updatedAt. one of the things that is important when you want to save any information is the integrity of the said information. if these two fields are read from user requests, we give malicious users to give a chance to set this fields to any time they want and undertake the integrity of our databases.
I choose this decisions base on the requirement that i said previously.

## Features
