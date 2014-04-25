App.cards.synergieTypes = {
  heal:             'heal',
  damage_friend:    'damage_friend',
  kill:             'kill',
  armor:            'armor',
  weapon:           'weapon',
  damage_enemy:     'damage_enemy',
  summon:           'summon',
};

with (App.cards.synergieTypes) {
  App.cards.synergies = {

    /****************************************************
    * Warrior
    ****************************************************/

    // Armor Up!
    725:  {trigger: [armor]},
    // Inner Rage
    22:   {trigger: [damage_friend, damage_enemy]},
    // Execute
    785:  {trigger: [kill], listen: [damage_enemy]},
    // Shied Slam
    546: {trigger: [damage_enemy], listen: [armor]},
    // Upgrade!!
    511:  {trigger: [weapon, damage_enemy], listen: [weapon]},
    // Whirlwind
    636:  {trigger: [damage_enemy, damage_friend]},
    // Fiery War Axe
    401:  {listen: [weapon], trigger: [damage_enemy]},
    // Battle Rage
    400:  {listen: [damage_friend]},
    // Cleave
    940:  {trigger: [damage_enemy]},
    // Commanding Shout
    1026: {listen: [damage_friend]},
    // Heroic Strike
    1007: {trigger: [damage_enemy]},
    // Rampage
    1108: {listen: [damage_friend]},
    // Slam
    1074: {trigger: [damage_friend, damage_enemy]},
    // Armorsmith
    596:  {trigger: [armor], listen: [damage_friend]},
    // Cruel Taskmaster
    285:  {trigger: [damage_friend, damage_enemy]},
    // Charge
    344:  {},
    // Shield Block
    1023: {trigger: [armor]},
    // Frothing Berserker
    654:  {listen: [damage_friend, damage_enemy]},
    // Warsong Commander
    1009: {listen: [summon]}, /* FIXME */
    // Mortal Strike
    804:  {trigger: [damage_enemy]},
    // Arathi Weaponsmith
    538:  {trigger: [weapon, damage_enemy]},
    // Kor'kron Elite
    28:   {},
    // Arcanite Reaper
    304:  {trigger: [weapon, damage_enemy]},
    // Brawl
    75:   {},
    // Gorehowl
    810:  {trigger: [weapon, damage_enemy]},
    // Grommash Hellscream
    338:  {listen: [damage_friend]}

  };
}

