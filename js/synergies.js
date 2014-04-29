App.cards.synergieTypes = {
  heal:             'heal',
  damage_friend:    'damage_friend',
  kill:             'kill',
  armor:            'armor',
  weapon:           'weapon',
  damage_enemy:     'damage_enemy',
  summon:           'summon',
  murloc:           'murloc',
  beast:            'beast',
  pirate:           'pirate',
  demon:            'demon',
  secret:           'secret',
  silence:          'silence',
  taunt:            'taunt',
  spell:            'spell',
  totem:            'totem',
  overload:         'overload',
};

with (App.cards.synergieTypes) {
  App.cards.synergies = {

    /****************************************************
    * Warlock
    ****************************************************/

    // Sacrificial Pact
    163:  {trigger: [heal], listen: [demon]},
    // Soulfire
    974:  {trigger: [damage_enemy]},
    // Corruption
    982:  {trigger: [kill]},
    // Mortal Coil
    1092: {trigger: [damage_enemy, damage_friend]},
    // Power Overwhelming
    846:  {},
    // Blood Imp
    469:  {trigger: [demon]},
    // Flame Imp
    1090: {trigger: [demon]},
    // Voidwalker
    48:   {trigger: [demon]},
    // Demonfire
    1142: {trigger: [damage_enemy]},
    // Succubus
    592:  {trigger: [demon]},
    // Drain Life
    919:  {trigger: [damage_enemy, damage_friend, heal]},
    // Sense Demons
    860:  {listen: [demon]},
    // Shadow Bolt
    914:  {trigger: [damage_enemy]},
    // Felguard
    517:  {trigger: [demon]},
    // Void Terror
    1221: {trigger: [demon]},
    // Hellfire
    950:  {trigger: [damage_enemy]},
    // Shadowflame
    147:  {trigger: [damage_enemy, kill]},
    // Pit Lord
    783:  {trigger: [demon]},
    // Summoning Portal
    969:  {},
    // Bane of Doom
    23:   {trigger: [damage_enemy, damage_friend, summon]},
    // Doomguard
    631:  {trigger: [demon]},
    // Siphon Soul
    1100: {trigger: [kill, heal]},
    // Dread Infernal
    1019: {trigger: [damage_enemy, damage_friend, demon]},
    // Twisting Nether
    859:  {},
    // Lord Jaraxxus
    492:  {},

    /****************************************************
    * Shaman
    ****************************************************/
    // fixme should we add totems ?

    // Ancestral Healing
    149:  {trigger: [taunt]},
    // Totemic Might
    830:  {listen: [totem]},
    // Earth Shock
    767:  {trigger: [damage_enemy, damage_friend, silence]},
    // Forked Lightning
    299:  {trigger: [damage_enemy, overload]},
    // Frost Shock
    971:  {trigger: [damage_enemy]},
    // Lightning Bolt
    505:  {trigger: [damage_enemy, damage_friend, overload]},
    // Rockbiter Weapon
    239:  {},
    // Dust Devil
    618:  {trigger: [overload]},
    // Stormforged Axe
    960:  {trigger: [overload, weapon]},
    // Ancestral Spirit
    404:  {},
    // Windfury
    51:   {},
    // Flametongue Totem
    1008: {},
    // Far Sight
    818:  {},
    // Feral Spirit
    238:  {trigger: [summon, overload]},
    // Hex
    766:  {},
    // Lava Burst
    864:  {trigger: [overload, damage_enemy, damage_friend]},
    // Lightning Storm
    629:  {trigger: [overload, damage_enemy, damage_friend]},
    // Mana Tide Totem
    513:  {},
    // Unbound Elemental
    774:  {listen: [overload]},
    // Windspeaker
    178:  {},
    // Doomhammer
    352:  {trigger: [overload]},
    // Bloodlust
    1171: {},
    // Earth Elemental
    1141: {trigger: [overload]},
    // Fire Elemental
    189:  {trigger: [damage_enemy, damage_friend]},
    // Al'Akir the Windlord
    32:   {},
    // Totemic Call
    687:  {trigger: [summon, totem]},

    /****************************************************
    * Hunter
    ****************************************************/
    // Hunter's Mark
    141:  {},
    // Steady Shot
    229:  {},
    // Multi-Shot
    292:  {trigger: [damage_enemy]},
    // Kill Command
    296:  {trigger: [damage_enemy, damage_friend], listen:[beast]},
    // Boar
    298:  {trigger: [beast]},
    // Gladiator's Longbow
    311:  {trigger: [weapon]},
    // Explosive Shot
    394:  {trigger: [damage_enemy]},
    // Animal Companion
    437:  {trigger: [summon, beast]},
    // Snake Trap
    455:  {trigger: [summon, beast]},
    // Freezing Trap
    519:  {trigger: [secret]},
    // Explosive Trap
    585:  {trigger: [damage_enemy]},
    // Timber Wolf
    606:  {trigger: [beast], listen: [beast]},
    // Tundra Rhino
    699:  {trigger: [beast], listen: [beast]},
    // Snipe
    814:  {trigger: [secret, damage_enemy]},
    // Arcane Shot
    877:  {trigger: [damage_enemy, damage_friend]},
    // Flare
    896:  {listen: [secret]},
    // Bestial Wrath
    903:  {listen: [beast]},
    // Houndmaster
    1003: {trigger: [taunt], listen: [beast]},
    // Tracking
    1047: {},
    // Misdirection
    1091: {trigger: [secret]},
    // Deadly Shot
    1093: {trigger: [kill]},
    // King Krush
    1144: {trigger: [beast]},
    // Starving Buzzard
    1241: {trigger: [beast], listen: [beast]},
    // Unleash the Hounds
    1243: {trigger: [summon, beast]},
    // Savannah Highmane
    1261: {trigger: [summon, beast], listen: [kill]},
    // Scavenging Hyena
    1281: {trigger: [beast], listen: [beast]},
    // Eaglehorn Bow
    1662: {trigger: [weapon]},

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
    997: {trigger: [pirate]},
    // Elven Archer
    389: {trigger: [damage_friend, damage_enemy]},
    // Goldshire Footman
    922: {},
    // Grimscale Oracle
    510: {trigger: [murloc], listen: [murloc]},
    // Hungry Crab
    443: {trigger: [beast], listen: [murloc]},
    // Leper Gnome
    658: {},
    // Lightwarden
    1655: {listen: [heal]},
    // Murloc Raider
    191: {trigger: [murloc]},
    // Murloc Tidecaller
    475: {trigger: [murloc], listen: [murloc]},
    // Secretkeeper
    158: {listen: [secret]},
    // Shieldbearer
    866: {},
    // Southsea Deckhand
    724: {listen: [weapon]},
    // Stonetusk Boar
    648: {trigger: [beast]},
    // Voodoo Doctor
    132: {trigger: [heal]},
    // Worgen Infiltrator
    994: {},
    // Young Dragonhawk
    641: {trigger: [beast]},
    // Young Priestess
    1634: {},
    // Acidic Swamp Ooze
    906: {},
    // Amani Berserker
    790: {listen: [damage_friend]},
    // Ancient Watcher
    605: {affinity: [taunt, silence]},
    // Bloodfen Raptor
    216: {trigger: [beast]},
    // Bloodmage Thalnos
    749: {listen: [spell]},
    // Bluegill Warrior
    739: {trigger: [murloc]},
    // Captain's Parrot
    530: {trigger: [beast], listen: [pirate]},
    // Crazed Alchemist
    801: {},
    // Dire Wolf Alpha
    985: {trigger: [beast]},
    // Doomsayer
    138: {trigger: [kill]},
    // Faerie Dragon
    609: {},
  };
}

