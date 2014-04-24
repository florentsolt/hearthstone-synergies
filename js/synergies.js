var synergies = {
  heal:             1,
  damage_friend:  2,
  kill:             3,
  armor:            4,
  weapon:           5,
  damage_enemy:     6,
};

for (var id in synergies) {
  eval("var " + id + " = '" + id + "';");
}

var cards_synergies = {

  /****************************************************
  * Warrior
  ****************************************************/

  // Inner Rage
  22:   {trigger: [damage_friend, damage_enemy]},
  // Execute
  785:  {trigger: [kill], listen: [damage_enemy]},
  // Shied Slam
  1074: {trigger: [damage_friend, damage_enemy], listen: [armor]},
  // Upgrade!!
  511:  {trigger: [weapon, damage_enemy], listen: [weapon]},
  // Whirlwind
  636:  {trigger: [damage_enemy, damage_friend]},
  // Fiery War Axe
  401:  {listen: [weapon], trigger: [damage_enemy]},
  // Battle Rage
  400:  {listen: [damage_friend]},
  // Armorsmith
  596:  {listen: [damage_friend]},
  // Cleave
  940:  {trigger: [damage_enemy]},
  // Commanding Shout
  1026: {listen: [damage_friend]},
  // Cruel Taskmaster
  285:  {trigger: [damage_friend, damage_enemy]},


}

