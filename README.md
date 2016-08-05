# StoryMaker

[StoryMaker Link] (http://storymaker.herokuapp.com/)

StoryMaker is a web application that allows users to draw images on a canvas and then transform a series of images into a GIF.

## Usage

Right now, the basics of GIF creation are available and working. During the creation process, users use a canvas item to illustrate on cards. Illustration is aided by offering a color spectrum and stroke width editing tools. Also available is the ability to undo unwanted lines through an undo tool. Individual images are stored on Cloudinary with url pointers stored in the database. Once a user has the story built with the cards desired created, he or she can preview the application of the cards through the preview editing tool. Users can make the cards rotate at fast, medium, and slow speeds. A JavaScript loop mimics these speeds during the preview phase. Once a user decides on the appropriate speed, he or she will select the create button, which takes the individual cards and packages them into a GIF of the selected speed interval. The GIF creation process is accomplished through using the gifshot plugin.

## Demo

[Live Demo] (http://res.cloudinary.com/cassbaltz/image/upload/v1470432252/MichStar/StoryMakerDemo_t2gag3.gif)
