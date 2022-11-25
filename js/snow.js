const fps = 100;
const snowflacksCount = 500;

let canvas;
let context;

class snowflack 
{
    constructor(x, y, speed, size, time) 
    {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.time = time;
    }
}

let snowflacks = [];

function initialize()
{
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    context.fillStyle = 'rgb(225, 225, 225)';

    generateSnowflacks();

    for(let i = 0; i < 1282; i++)
    {
        renderPhysics();
    }

    setInterval(render, 1000 / fps);
}

function generateSnowflacks()
{
    for (let i = 0; i < snowflacksCount; i++)
    {
        snowflacks.push(new snowflack(getRandomInt(0, canvas.width), -20, getRandomFloat(4, 7), getRandomInt(4, 6), getRandomFloat(0, 15)));
    }
}

function render()
{
    renderPhysics();

    renderGraphics();
}

function renderGraphics()
{
    context.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    for (let i = 0; i < snowflacks.length; i++) //paint snowflacks
    {
        context.beginPath();
        context.arc(snowflacks[i].x, snowflacks[i].y, snowflacks[i].size, 0, 2 * Math.PI, false);
        context.fill();
    }
}

function renderPhysics()
{
    for(let i = 0; i < snowflacks.length; i++)
    {
        snowflacks[i] = new snowflack(snowflacks[i].x, snowflacks[i].y + snowflacks[i].speed, snowflacks[i].speed, snowflacks[i].size, snowflacks[i].time + 0.1);
    
        snowflacks[i].x += Math.sin(snowflacks[i].time) * 2;

        if(snowflacks[i].y > canvas.height)
        {
            snowflacks[i].y = -getRandomInt(5, 10);   
        }
    }
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFloat(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.random() * (max - min) + min;
}