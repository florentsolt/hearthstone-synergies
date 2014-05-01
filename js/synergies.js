App.cards.synergieTypes = {
  heal_minion:      'heal_minion',
  heal_hero:        'heal_hero',
  damage_friend:    'damage_friend',
  damage_enemy:     'damage_enemy',
  kill:             'kill',
  armor:            'armor',
  weapon:           'weapon',
  summon:           'summon',
  murloc:           'murloc',
  beast:            'beast',
  pirate:           'pirate',
  demon:            'demon',
  secret:           'secret',
  silence:          'silence',
  taunt:            'taunt',
  spell:            'spell',
  spell_damage:     'spell_damage',
  totem:            'totem',
  overload:         'overload',
  divine_shield:    'divine_shield',
  freeze:           'freeze'
};

with (App.cards.synergieTypes) {
  App.cards.synergies = {

    // The Coin
    1746: {trigger: [spell]},

    /****************************************************
    * Mage
    ****************************************************/

    // Arcane Missiles
    564: {trigger: [damage_enemy, spell], listen: [spell_damage]},
    // Ice Lance
    172: {trigger: [spell, freeze], listen: [freeze, spell_damage]},
    // Mirror Image
    960: {trigger: [spell]},
    // Mana Wyrm
    405: {listen: [spell]},
    // Arcane Explosion
    447: {trigger: [spell, damage_enemy], listen: [spell_damage]},
    // Frostbolt
    662: {trigger: [spell, damage_enemy, freeze], listen: [spell_damage]},
    // Sorcerer's Apprentice
    614: {listen: [spell]},
    // Arcane Intellect
    555: {trigger: [spell]},
    // Counterspell
    113: {trigger: [spell, secret]},
    // Frost Nova
    587: {trigger: [freeze]},
    // Ice Barrier
    621: {trigger: [armor, secret, spell]},
    // Ice Block
    192: {trigger: [spell, secret]},
    // Mirror Entity
    195: {trigger: [spell, secret, summon]},
    // Spellbender
    366: {trigger: [spell, secret, summon]},
    // Vaporize
    286: {trigger: [spell, secret]},
    // Kirin Tor Mage
    748: {listen: [secret]},
    // Cone of Cold
    430: {trigger: [spell, damage_enemy, freeze]},
    // Fireball
    315: {trigger: [spell, damage_enemy]},
    // Polymorph
    77: {trigger: [spell]},
    // Ethereal Arcanist
    1737: {listen: [secret]},
    // Water Elemental
    395: {trigger: [freeze]},
    // Blizzard
    457: {trigger: [spell, damage_enemy, freeze]},
    // Flamestrike
    1004: {trigger: [spell, damage_enemy]},
    // Archmage Antonidas
    1080: {listen: [spell]},
    // Pyroblast
    1087: {trigger: [spell, damage_enemy]},

    /****************************************************
    * Paladin
    ****************************************************/

    // Light's Justice
    383: {trigger: [weapon]},
    // Blessing of Might
    70: {trigger: [spell]},
    // Blessing of Wisdom
    1373: {trigger: [spell]},
    // Eye for an Eye
    462: {trigger: [secret, spell, damage_enemy]},
    // Hand of Protection
    727: {trigger: [divine_shield, spell]},
    // Humility
    854: {trigger: [spell], affinity: [damage_enemy]},
    // Noble Sacrifice
    584: {trigger: [secret, spell, summon]},
    // Redemption
    140: {trigger: [secret, spell, summon]},
    // Repentance
    232: {trigger: [secret, spell], affinity: [damage_enemy]},
    // Equality
    756: {trigger: [spell], affinity: [damage_enemy]},
    // Holy Light
    291: {trigger: [spell, heal_minion, heal_hero]},
    // Argent Protector
    1022: {trigger: [divine_shield]},
    // Sword of Justice
    643: {trigger: [weapon], listen: [summon]},
    // Divine Favor
    679: {trigger: [spell]},
    // Aldor Peacekeeper
    1167: {},
    // Truesilver Champion
    847: {trigger: [weapon, heal_hero]},
    // Blessing of Kings
    943: {trigger: [spell], affinity: [summon]},
    // Consecration
    476: {trigger: [spell, damage_enemy]},
    // Hammer of Wrath
    250: {trigger: [spell, damage_enemy]},
    // Blessed Champion
    1522: {trigger: [spell]},
    // Holy Wrath
    435: {trigger: [spell, damage_enemy]},
    // Avenging Wrath
    1174: {trigger: [spell, damage_enemy]},
    // Guardian of Kings
    1068: {trigger: [heal_hero]},
    // Lay on Hands
    594: {trigger: [spell, heal_hero, heal_minion]},
    // Tirion Fordring
    890: {trigger: [divine_shield, weapon]},

    /****************************************************
    * Warlock
    ****************************************************/

    // Sacrificial Pact
    163:  {trigger: [heal_hero], listen: [demon]},
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
    919:  {trigger: [damage_enemy, damage_friend, heal_hero]},
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
    1100: {trigger: [kill, heal_hero]},
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
    149:  {trigger: [taunt, heal_minion]},
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
    519:  {trigger: [secret, spell]},
    // Explosive Trap
    585:  {trigger: [damage_enemy]},
    // Timber Wolf
    606:  {trigger: [beast], listen: [beast]},
    // Tundra Rhino
    699:  {trigger: [beast], listen: [beast]},
    // Snipe
    814:  {trigger: [secret, spell, damage_enemy]},
    // Arcane Shot
    877:  {trigger: [damage_enemy, damage_friend]},
    // Flare
    896:  {listen: [secret, spell]},
    // Bestial Wrath
    903:  {listen: [beast]},
    // Houndmaster
    1003: {trigger: [taunt], listen: [beast]},
    // Tracking
    1047: {},
    // Misdirection
    1091: {trigger: [secret, spell]},
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
    1688: {trigger: [beast], listen: [damage_friend]},
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
    1655: {listen: [heal_minion]},
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
    132: {trigger: [heal_hero, heal_minion]},
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
    749: {trigger: [spell_damage]},
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
    // Frostwolf Grunt
    41:  {},
    // Ironbeak Owl
    290:  {trigger: [beast, silence]},
    // Knife Juggler
    1073: {listen: [summon]},
    // Kobold Geomancer
    672:  {trigger: [spell_damage]},
    // Loot Hoarder
    251:  {},
    // Lorewalker Cho
    1135: {listen: [spell]},
    // Mad Bomber
    762:  {trigger: [damage_enemy, damage_friend]},
    // Mana Addict
    12:   {listen: [spell]},
    // Mana Wraith
    715:  {},
    // Master Swordsmith
    351:  {},
    // Millhouse Manastorm
    855:  {},
    // Murloc Tidehunter
    976:  {trigger: [summon, murloc]},
    // Nat Pagle
    1147: {},
    // Novice Engineer
    284:  {},
    // Pint-Sized Summoner
    37:   {},
    // River Crocolisk
    1369: {trigger: [beast]},
    // Sunfury Protector
    891:  {trigger: [taunt]},
    // Wild Pyromancer
    1014: {trigger: [damage_enemy, damage_friend], listen: [spell, spell_damage]},
    // Youthful Brewmaster
    415:  {},
    // Acolyte of Pain
    1659: {},
    // Alarm-o-Bot
    1658: {},
    // Arcane Golem
    466:  {},
    // Big Game Hunter
    1657: {trigger: [kill]},
    // Blood Knight -- listen divine shield ?
    755:  {},
    // Coldlight Oracle
    1016: {trigger: [murloc]},
    // Coldlight Seer
    453:  {trigger: [murloc], listen: [murloc]},
    // Dalaran Mage
    175:  {trigger: [spell_damage]},
    // Demolisher
    979:  {trigger: [damage_enemy]},
    // Earthen Ring Farseer
    1651: {trigger: [heal_minion, heal_hero]},
    // Emperor Cobra
    1098: {trigger: [beast, kill], affinity: [taunt]},
    // Flesheating Ghoul
    // Harvest Golem
    // Imp Master
    // Injured Blademaster
    // Ironforge Rifleman
    // Ironfur Grizzly
    // Jungle Panther
    // King Mukla
    // Magma Rager
    // Mind Control Tech
    // Murloc Warleader
    // Questing Adventurer
    // Raging Worgen
    // Raid Leader
    // Razorfen Hunter
    // Scarlet Crusader
    // Shattered Sun Cleric
    // Silverback Patriarch
    // Southsea Captain
    // Tauren Warrior
    // Thrallmar Farseer
    // Tinkmaster Overspark
    // Wolfrider
    // Ancient Brewmaster
    // Ancient Mage
    // Chillwind Yeti
    // Cult Master
    // Dark Iron Dwarf
    // Defender of Argus
    // Dragonling Mechanic
    // Dread Corsair
    // Gnomish Inventor
    // Leeroy Jenkins
    // Mogu'shan Warden
    // Oasis Snapjaw
    // Ogre Magi
    // Old Murk-Eye
    // Sen'jin Shieldmasta
    // Silvermoon Guardian
    // Spellbreaker
    // Stormwind Knight
    // Twilight Drake
    // Violet Teacher
    // Abomination
    // Azure Drake
    // Booty Bay Bodyguard
    // Captain Greenskin
    // Darkscale Healer
    // Elite Tauren Chieftain
    // Faceless Manipulator
    // Fen Greeper
    // Frostwolf Warlord
    // Gadgetzan Auctioneer
    // Gurubashi Berserker
    // Harrison Jones
    // Nightblade
    // Silver Hand Knight
    // Spiteful Smith
    // Stampeding Kodo
    // Stormpike Commando
    // Stranglethorn Tiger
    // Venture Co. Mercenary
    // Archmage
    // Argent Commander
    // Boulderfist Orge
    // Cairne Bloodhoof
    // Frost Elemental
    // Gelbin Mekkatorque
    // Hogger
    // Illidan Stormrage
    // Lord of the Arena
    // Priestess of Elune
    // Reckless Rocketeer
    // Sunwalker
    // Sylvanas Windrunner
    // The Beast
    // The Black Knight
    // Windfury Harpy
    // Baron Geddon
    // Core Hound
    // Ravenholdt Assassin
    // Stormwind Champion
    // War Golem
    // Gruul
    // Ragnaros the Firelord
    // Alexstrasza
    // Malygos
    // Nozdormu
    // Onyxia
    // Ysera
    // Deathwing
    // Sea Giant
    // Mountain Giant
    // Molten Giant
  };
}

