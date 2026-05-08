
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const zones = [
"Splash Hill Zone",
"Casino Street Zone",
"Lost Labyrinth Zone",
"Mad Gear Zone",
"Sky Fortress Zone",
"White Park Zone",
"Oil Desert Zone",
"Lava Reef Zone",
"Death Egg Zone",
"Final Zone"
];

let level = 0;
let rings = 0;
let emeralds = 0;
let superForm = false;
let hyperForm = false;

const sonic = {
x:120,
y:300,
vx:0,
vy:0,
w:48,
h:48,
jump:false,
speed:7,
color:'blue'
};

const badniks = [
{x:700,y:500,dir:1},
{x:1200,y:500,dir:-1},
{x:1600,y:500,dir:1}
];

const keys = {};

document.addEventListener('keydown',e=>keys[e.key]=true);
document.addEventListener('keyup',e=>keys[e.key]=false);

function touch(id,key){
document.getElementById(id).ontouchstart=()=>keys[key]=true;
document.getElementById(id).ontouchend=()=>keys[key]=false;
}
touch('left','ArrowLeft');
touch('right','ArrowRight');
touch('jump',' ');

document.getElementById('transform').onclick = ()=>{
if(emeralds >= 7 && rings >= 50){
if(level === 9){
hyperForm = true;
superForm = false;
sonic.color = 'white';
}else{
superForm = true;
sonic.color = 'gold';
}
}
}

function update(){
sonic.vx = 0;

if(keys['ArrowLeft']) sonic.vx = -sonic.speed;
if(keys['ArrowRight']) sonic.vx = sonic.speed;

if(keys[' '] && !sonic.jump){
sonic.vy = -14;
sonic.jump = true;
}

sonic.x += sonic.vx;
sonic.vy += 0.6;
sonic.y += sonic.vy;

if(sonic.y > 500){
sonic.y = 500;
sonic.vy = 0;
sonic.jump = false;
}

for(let b of badniks){
b.x += b.dir * 2;

if(b.x < 400 || b.x > 1800){
b.dir *= -1;
}

if(Math.abs(sonic.x - b.x) < 40 && Math.abs(sonic.y - b.y) < 40){
rings = Math.max(0, rings - 10);
}
}

if(Math.random() < 0.03){
rings++;
}

if(sonic.x > 2000){
level++;
sonic.x = 0;

if(level > 9){
alert("You beat Sonic Fan Game Episode 3 & 4!");
level = 0;
}
}

document.getElementById('info').innerText =
'Rings: ' + rings + ' | Chaos Emeralds: ' + emeralds + '/7';
}

function drawZone(){
const colors = [
'#4fd65b','#ffbf00','#2bc78e','#777','#4e79ff',
'#e6f7ff','#bf7a30','#ff4a4a','#999','#111'
];

ctx.fillStyle = colors[level];
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle = 'green';
ctx.fillRect(0,550,canvas.width,200);

ctx.fillStyle = 'white';
ctx.font = '32px Arial';
ctx.fillText(zones[level], 20, 50);

for(let i=0;i<40;i++){
ctx.fillStyle='gold';
ctx.beginPath();
ctx.arc((i*100)-(sonic.x*0.3)+200, 250 + Math.sin(i)*50, 10, 0, Math.PI*2);
ctx.fill();
}
}

function drawBadniks(){
for(let b of badniks){
ctx.fillStyle='red';
ctx.fillRect(b.x - sonic.x + 200,b.y,40,40);
}
}

function drawSonic(){
ctx.fillStyle = sonic.color;
ctx.beginPath();
ctx.arc(200, sonic.y, 25, 0, Math.PI*2);
ctx.fill();

if(superForm){
for(let i=0;i<7;i++){
ctx.fillStyle=['red','blue','green','yellow','purple','cyan','white'][i];
ctx.beginPath();
ctx.arc(
200 + Math.cos(Date.now()/200+i)*60,
sonic.y + Math.sin(Date.now()/200+i)*60,
8,0,Math.PI*2
);
ctx.fill();
}
}

if(hyperForm){
for(let i=0;i<7;i++){
ctx.fillStyle=['red','blue','green','yellow','purple','cyan','white'][i];
ctx.beginPath();
ctx.arc(
200 + Math.cos(Date.now()/120+i)*80,
sonic.y + Math.sin(Date.now()/120+i)*80,
12,0,Math.PI*2
);
ctx.fill();
}

ctx.fillStyle='lime';
ctx.beginPath();
ctx.arc(200, sonic.y-80, 25, 0, Math.PI*2);
ctx.fill();
}
}

function loop(){
update();
drawZone();
drawBadniks();
drawSonic();
requestAnimationFrame(loop);
}

loop();
