var roleBuilder = {

	/** @param {Creep} creep **/
	run: function(creep) {
		
		var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
		if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.harvesting = true;
			creep.say('🔄 harvest');
		}
		if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
			creep.memory.harvesting = false;
			creep.say('🚧 build');
		}

		if(!creep.memory.harvesting) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length) {
				if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff00'}});
				}
			}
		}
		else if (sites.length > 0) {
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
			}
		}
		else {
			var targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
							structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
			});
			if(targets.length > 0) {
				if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		}
		
	}
};

module.exports = roleBuilder;