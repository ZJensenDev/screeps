var spawning = {
	
	basic: function (type, limit, spawner) {
		var count = _.filter(Game.creeps, creep => creep.memory.role == type);
		
		if (count.length < limit) {
			var newName = type + Game.time;
			spawner.spawnCreep([WORK, CARRY, MOVE], newName, {
		  	memory: {
				role: type
		  	}
			});
		}
	},
	big: function (type, limit, spawner) {
		var count = _.filter(Game.creeps, creep => creep.memory.role == type);
		
		if (count.length < limit) {
			var newName = type + Game.time;
			spawner.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {
			  memory: {
				role: type
			  }
			});
		}
	}
	
}

module.exports = spawning;