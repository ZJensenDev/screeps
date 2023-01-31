"use strict";

var roleHarvester 	= require('./roles/harvester');
var roleBuilder 	= require('./roles/builder');
var roleUpgrader 	= require('./roles/upgrader');
var spawning 		= require('./helpers/spawner');

module.exports.loop = function () {
  
  	
  	// Clean creeps
  	for (var name in Memory.creeps) {
		if (!Game.creeps[name]) {
	  	delete Memory.creeps[name];
	  		console.log('Clearing non-existing creep memory:', name);
		}
  	}
		
  	if (Game.spawns['Spawn1'].spawning) {
		var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
		Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, {
	  	align: 'left',
	  	opacity: 0.8
		});
  	}
  	
  	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
	  		roleHarvester.run(creep);
		}
		if (creep.memory.role == 'builder') {
	  		roleBuilder.run(creep);
		}
		if (creep.memory.role == 'upgrader') {
	  		roleUpgrader.run(creep);
		}
  	}
  
  	// Creep Spawner
	spawning.big("harvester", 2, Game.spawns['Spawn1']);
	spawning.basic("builder", 4, Game.spawns['Spawn1']);
	spawning.basic("upgrader", 2, Game.spawns['Spawn1']);
	
};