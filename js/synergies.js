App.cards.synergieTypes = {
  heal:             'heal',
  damage_friend:    'damage_friend',
  kill:             'kill',
  armor:            'armor',
  weapon:           'weapon',
  damage_enemy:     'damage_enemy',
  summon:           'summon',
  murloc:           'murloc',
  secret:           'secret',
  silence:          'silence',
  taunt:            'taunt',
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
    511:  {trigger: [weapon], listen: [weapon]},
    // Whirlwind
    636:  {trigger: [damage_enemy, damage_friend]},
    // Fiery War Axe
    401:  {trigger: [weapon]},
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
    538:  {trigger: [weapon]},
    // Kor'kron Elite
    28:   {},
    // Arcanite Reaper
    304:  {trigger: [weapon]},
    // Brawl
    75:   {},
    // Gorehowl
    810:  {trigger: [weapon]},
    // Grommash Hellscream
    338:  {listen: [damage_friend]},

    /****************************************************
    * Neutral
    ****************************************************/

    // Wisp
    179: {},
    // Abusive Sergeant
    242: {},
    // Angry Chicken
    1688: {listen: [damage_friend]},
    // Argent  Squire
    757: {},
    // Bloodsail Corsair
    997: {},
    // Elven Archer
    389: {trigger: [damage_friend, damage_enemy]},
    // Goldshire Footman
    922: {},
    // Grimscale Oracle
    510: {listen: [murloc]},
    // Hungry Crab
    443: {listen: [murloc]},
    // Leper Gnome
    658: {},
    // Lightwarden
    1655: {listen: [heal]},
    // Murloc Raider
    191: {},
    // Murloc Tidecaller
    475: {listen: [murloc]},
    // Secretkeeper
    158: {listen: [secret]},
    // Shieldbearer
    866: {},
    // Southsea Deckhand
    724: {listen: [weapon]},
    // Stonetusk Boar
    648: {},
    // Voodoo Doctor
    132: {trigger: [heal]},
    // Worgen Infiltrator
    994: {},
    // Young Dragonhawk
    641: {},
    // Young Priestess
    1634: {},
    // Acidic Swamp Ooze
    906: {},
    // Amani Berserker
    790: {listen: [damage_friend]},
    // Ancient Watcher
    605: {listen: [silence, taunt]},
  };
}

