namespace SpriteKind {
    export const automobil = SpriteKind.create()
    export const automobil2 = SpriteKind.create()
    export const predavacka = SpriteKind.create()
    export const box = SpriteKind.create()
    export const test = SpriteKind.create()
    export const box2 = SpriteKind.create()
    export const box3 = SpriteKind.create()
    export const dodavka = SpriteKind.create()
    export const pokladnicka = SpriteKind.create()
    export const follow = SpriteKind.create()
    export const vzduch = SpriteKind.create()
    export const tut = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight0, function (sprite, location) {
    if (info.score() >= 6 && boxy > 0) {
        if (info.score() <= 25) {
            snickerska.follow(mySprite, 50 + info.score())
        } else {
            snickerska.follow(mySprite, 75 + info.score())
        }
    } else {
        snickerska.follow(mySprite, 0)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile12`, function (sprite, location) {
    if (Math.percentChance(boxy * 10)) {
        music.powerDown.play()
        game.splash("Osobná prehliadka")
        game.splash("Premen Eura na forinty", "300 forintov = 1 Euro")
        eura = randint(0, 30)
        forinty = eura * 300
        game.splash("Premen " + eura + " eur", "na forinty")
        if (game.askForNumber("", 4) == forinty) {
            tiles.placeOnTile(mySprite, tiles.getTileLocation(4, 18))
            pokladnickavpravo.say("Ďakujeme za váš nákup", 1000)
        } else {
            game.over(false)
        }
    } else {
        tiles.placeOnTile(mySprite, tiles.getTileLocation(4, 18))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.predavacka, function (sprite, otherSprite) {
    if (boxy > 0) {
        game.over(false)
    } else {
        mySprite.setPosition(190, 340)
        controller.player1.moveSprite(mySprite, 0, 0)
        music.playTone(139, music.beat(BeatFraction.Half))
        pause(2000)
        controller.player1.moveSprite(mySprite, 75, 75)
        tiles.placeOnRandomTile(snickerska, sprites.dungeon.floorLight0)
        tiles.placeOnRandomTile(chest1, assets.tile`tile11`)
        tiles.placeOnRandomTile(chest2, assets.tile`tile11`)
        tiles.placeOnRandomTile(chest3, assets.tile`tile11`)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.overlapsWith(chest1)) {
        if (boxy < 3) {
            boxy += 1
            chest1.destroy(effects.clouds, 200)
            mySprite.say("" + boxy + "/3", 500)
        } else {
            mySprite.say("3/3 :(", 200)
        }
    }
    if (mySprite.overlapsWith(chest2)) {
        if (boxy < 3) {
            boxy += 1
            chest2.destroy(effects.clouds, 200)
            mySprite.say("" + boxy + "/3", 500)
        } else {
            mySprite.say("3/3 :(", 200)
        }
    }
    if (mySprite.overlapsWith(chest3)) {
        if (boxy < 3) {
            boxy += 1
            chest3.destroy(effects.clouds, 200)
            mySprite.say("" + boxy + "/3", 500)
        } else {
            mySprite.say("3/3 :(", 200)
        }
    }
})
sprites.onOverlap(SpriteKind.automobil, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.overlapsWith(ddodavka)) {
        for (let index = 0; index < boxy; index++) {
            info.changeScoreBy(1)
            music.baDing.playUntilDone()
            boxy += -1
            info.setLife(boxy)
            pause(1000)
        }
    }
})
sprites.onOverlap(SpriteKind.automobil2, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.tut, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        game.splash("Coop Jednota", "Shoplifting Simulator")
        game.splash("Ciel hry - zbierat boxy", "z Jednoty")
        game.splash("Zober box - E")
        game.splash("Boxy ukladaj do", "cerveneho auta")
        game.splash("Ulozit box - Q")
        game.splash("Pozor na predavacky", "a automobily")
        game.splash("Vela stastia!")
        tiles.placeOnTile(mySprite, tiles.getTileLocation(19, 21))
    }
})
scene.onOverlapTile(SpriteKind.predavacka, sprites.dungeon.floorLight4, function (sprite, location) {
    tiles.placeOnRandomTile(snickerska, sprites.dungeon.floorLight0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.dodavka, function (sprite, otherSprite) {
    tiles.placeOnRandomTile(snickerska, sprites.dungeon.floorLight0)
    chest1.destroy()
    chest2.destroy()
    chest3.destroy()
    chest1 = sprites.create(img`
        . b b b b b b b b b b b b b b . 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e e 4 4 4 4 4 4 4 4 4 4 e e b 
        b b b b b b b d d b b b b b b b 
        . b b b b b b c c b b b b b b . 
        b c c c c c b c c b c c c c c b 
        b c c c c c c b b c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b b b b b b b b b b b b b b b b 
        b e e e e e e e e e e e e e e b 
        b e e e e e e e e e e e e e e b 
        b c e e e e e e e e e e e e c b 
        b b b b b b b b b b b b b b b b 
        . b b . . . . . . . . . . b b . 
        `, SpriteKind.box)
    tiles.placeOnRandomTile(chest1, assets.tile`tile11`)
    chest2 = sprites.create(img`
        . b b b b b b b b b b b b b b . 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e e 4 4 4 4 4 4 4 4 4 4 e e b 
        b b b b b b b d d b b b b b b b 
        . b b b b b b c c b b b b b b . 
        b c c c c c b c c b c c c c c b 
        b c c c c c c b b c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b b b b b b b b b b b b b b b b 
        b e e e e e e e e e e e e e e b 
        b e e e e e e e e e e e e e e b 
        b c e e e e e e e e e e e e c b 
        b b b b b b b b b b b b b b b b 
        . b b . . . . . . . . . . b b . 
        `, SpriteKind.box2)
    tiles.placeOnRandomTile(chest2, assets.tile`tile11`)
    chest3 = sprites.create(img`
        . b b b b b b b b b b b b b b . 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
        b e e 4 4 4 4 4 4 4 4 4 4 e e b 
        b b b b b b b d d b b b b b b b 
        . b b b b b b c c b b b b b b . 
        b c c c c c b c c b c c c c c b 
        b c c c c c c b b c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b c c c c c c c c c c c c c c b 
        b b b b b b b b b b b b b b b b 
        b e e e e e e e e e e e e e e b 
        b e e e e e e e e e e e e e e b 
        b c e e e e e e e e e e e e c b 
        b b b b b b b b b b b b b b b b 
        . b b . . . . . . . . . . b b . 
        `, SpriteKind.box3)
    tiles.placeOnRandomTile(chest3, assets.tile`tile11`)
    for (let index = 0; index < 4; index++) {
        if (chest2.overlapsWith(chest1)) {
            tiles.placeOnRandomTile(chest2, assets.tile`tile11`)
        }
        if (chest3.overlapsWith(chest1) || chest3.overlapsWith(chest2)) {
            tiles.placeOnRandomTile(chest3, assets.tile`tile11`)
        }
    }
})
info.onLifeZero(function () {
	
})
scene.onHitWall(SpriteKind.automobil2, function (sprite, location) {
    auto2.destroy()
    auto1 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 6 6 6 6 . . 
        . . . . . 6 c 6 6 6 6 6 6 9 6 . 
        . . . . 6 c c 6 6 6 6 6 6 9 c 6 
        . . d 6 9 c c 6 9 9 9 9 9 9 c c 
        . d 6 6 9 c b 8 8 8 8 8 8 8 6 c 
        . 6 6 6 9 b 8 8 b b b 8 b b 8 6 
        . 6 6 6 6 6 8 b b b b 8 b b b 8 
        . 6 6 6 6 8 6 6 6 6 6 8 6 6 6 8 
        . 6 d d 6 8 f 8 8 8 f 8 8 8 8 8 
        . d d 6 8 8 8 f 8 8 f 8 8 8 8 8 
        . 8 8 8 8 8 8 8 f f f 8 8 8 8 8 
        . 8 8 8 8 f f f 8 8 8 8 f f f f 
        . . . 8 f f f f f 8 8 f f f f f 
        . . . . f f f f . . . . f f f . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.automobil)
    tiles.placeOnTile(auto1, tiles.getTileLocation(23, 22))
    if (info.score() <= 40) {
        auto1.setVelocity(-80 + info.score() * -3, 0)
    } else {
        auto1.setVelocity(-200, 0)
    }
})
scene.onHitWall(SpriteKind.automobil, function (sprite, location) {
    auto1.destroy()
    auto2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 3 3 3 3 3 3 3 3 . . . . 
        . . . 3 d 3 3 3 3 3 3 c 3 . . . 
        . . 3 c d 3 3 3 3 3 3 c c 3 . . 
        . 3 c c d d d d d d 3 c c d 3 d 
        . 3 c 3 a a a a a a a b c d 3 3 
        . 3 3 a b b a b b b a a b d 3 3 
        . 3 a b b b a b b b b a 3 3 3 3 
        . a a 3 3 3 a 3 3 3 3 3 a 3 3 3 
        . a a a a a a f a a a f a 3 d d 
        . a a a a a a f a a f a a a 3 d 
        . a a a a a a f f f a a a a a a 
        . a f f f f a a a a f f f a a a 
        . . f f f f f a a f f f f f a . 
        . . . f f f . . . . f f f f . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.automobil2)
    tiles.placeOnTile(auto2, tiles.getTileLocation(0, 23))
    if (info.score() <= 40) {
        auto2.setVelocity(80 + info.score() * 3, 0)
    } else {
        auto2.setVelocity(200, 0)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile10`, function (sprite, location) {
    tiles.placeOnTile(mySprite, tiles.getTileLocation(19, 14))
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight4, function (sprite, location) {
    snickerska.follow(mySprite, 0)
})
let auto2: Sprite = null
let forinty = 0
let eura = 0
let snickerska: Sprite = null
let pokladnickavpravo: Sprite = null
let ddodavka: Sprite = null
let chest3: Sprite = null
let chest2: Sprite = null
let chest1: Sprite = null
let auto1: Sprite = null
let mySprite: Sprite = null
let boxy = 0
tiles.setTilemap(tilemap`level_0`)
info.setScore(0)
boxy = 0
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(355, 340)
controller.player1.moveSprite(mySprite, 75, 75)
scene.cameraFollowSprite(mySprite)
let tutorialman = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.tut)
tiles.placeOnTile(tutorialman, tiles.getTileLocation(16, 21))
let tutorialpos = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . b b b b b b b b b . . . 
    `, SpriteKind.tut)
tiles.placeOnTile(tutorialpos, tiles.getTileLocation(17, 21))
auto1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 6 6 6 6 6 6 6 6 . . 
    . . . . . 6 c 6 6 6 6 6 6 9 6 . 
    . . . . 6 c c 6 6 6 6 6 6 9 c 6 
    . . d 6 9 c c 6 9 9 9 9 9 9 c c 
    . d 6 6 9 c b 8 8 8 8 8 8 8 6 c 
    . 6 6 6 9 b 8 8 b b b 8 b b 8 6 
    . 6 6 6 6 6 8 b b b b 8 b b b 8 
    . 6 6 6 6 8 6 6 6 6 6 8 6 6 6 8 
    . 6 d d 6 8 f 8 8 8 f 8 8 8 8 8 
    . d d 6 8 8 8 f 8 8 f 8 8 8 8 8 
    . 8 8 8 8 8 8 8 f f f 8 8 8 8 8 
    . 8 8 8 8 f f f 8 8 8 8 f f f f 
    . . . 8 f f f f f 8 8 f f f f f 
    . . . . f f f f . . . . f f f . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.automobil)
tiles.placeOnTile(auto1, tiles.getTileLocation(12, 22))
auto1.setVelocity(-100, 0)
let predavacka1 = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 1 1 1 1 b f e f . 
    e 4 f 1 1 1 1 1 1 f 4 e . 
    e e f 2 2 2 2 2 2 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.predavacka)
predavacka1.setPosition(24, 116)
predavacka1.setVelocity(50, 0)
let predavacka2 = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f f f c c f f f c . 
    f f f c f f f f f f f c . 
    c c c f f f e e f f c c . 
    f f f f f e e f f c c f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 1 1 1 1 b f e f . 
    e 4 f 1 1 1 1 1 1 f 4 e . 
    e e f 2 2 2 2 2 2 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.predavacka)
predavacka2.setPosition(24, 58)
predavacka2.setVelocity(50, 0)
chest1 = sprites.create(img`
    . b b b b b b b b b b b b b b . 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
    b e e 4 4 4 4 4 4 4 4 4 4 e e b 
    b b b b b b b d d b b b b b b b 
    . b b b b b b c c b b b b b b . 
    b c c c c c b c c b c c c c c b 
    b c c c c c c b b c c c c c c b 
    b c c c c c c c c c c c c c c b 
    b c c c c c c c c c c c c c c b 
    b b b b b b b b b b b b b b b b 
    b e e e e e e e e e e e e e e b 
    b e e e e e e e e e e e e e e b 
    b c e e e e e e e e e e e e c b 
    b b b b b b b b b b b b b b b b 
    . b b . . . . . . . . . . b b . 
    `, SpriteKind.box)
tiles.placeOnRandomTile(chest1, assets.tile`tile11`)
chest2 = sprites.create(img`
    . b b b b b b b b b b b b b b . 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
    b e e 4 4 4 4 4 4 4 4 4 4 e e b 
    b b b b b b b d d b b b b b b b 
    . b b b b b b c c b b b b b b . 
    b c c c c c b c c b c c c c c b 
    b c c c c c c b b c c c c c c b 
    b c c c c c c c c c c c c c c b 
    b c c c c c c c c c c c c c c b 
    b b b b b b b b b b b b b b b b 
    b e e e e e e e e e e e e e e b 
    b e e e e e e e e e e e e e e b 
    b c e e e e e e e e e e e e c b 
    b b b b b b b b b b b b b b b b 
    . b b . . . . . . . . . . b b . 
    `, SpriteKind.box2)
tiles.placeOnRandomTile(chest2, assets.tile`tile11`)
chest3 = sprites.create(img`
    . b b b b b b b b b b b b b b . 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b 
    b e 4 4 4 4 4 4 4 4 4 4 4 4 e b 
    b e e 4 4 4 4 4 4 4 4 4 4 e e b 
    b b b b b b b d d b b b b b b b 
    . b b b b b b c c b b b b b b . 
    b c c c c c b c c b c c c c c b 
    b c c c c c c b b c c c c c c b 
    b c c c c c c c c c c c c c c b 
    b c c c c c c c c c c c c c c b 
    b b b b b b b b b b b b b b b b 
    b e e e e e e e e e e e e e e b 
    b e e e e e e e e e e e e e e b 
    b c e e e e e e e e e e e e c b 
    b b b b b b b b b b b b b b b b 
    . b b . . . . . . . . . . b b . 
    `, SpriteKind.box3)
tiles.placeOnRandomTile(chest3, assets.tile`tile11`)
for (let index = 0; index < 4; index++) {
    if (chest2.overlapsWith(chest1)) {
        tiles.placeOnRandomTile(chest2, assets.tile`tile11`)
    }
    if (chest3.overlapsWith(chest1) || chest3.overlapsWith(chest2)) {
        tiles.placeOnRandomTile(chest3, assets.tile`tile11`)
    }
}
ddodavka = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
    . 2 c 2 e e e e e e e b c 4 2 2 
    . 2 2 e b b e b b b e e b 4 2 2 
    . 2 e b b b e b b b b e 2 2 2 2 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
    . e e e e e e f e e e f e 2 d d 
    . e e e e e e f e e f e e e 2 d 
    . e e e e e e f f f e e e e e e 
    . e f f f f e e e e f f f e e e 
    . . f f f f f e e f f f f f e . 
    . . . f f f . . . . f f f f . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.dodavka)
ddodavka.setPosition(373, 343)
let pokladnickavlavo = sprites.create(img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c 4 4 c c c c f . 
    . f f c c 4 4 4 4 c c f f . 
    . f f f b f 4 4 f b f f f . 
    . f f 4 1 f d d f 1 4 f f . 
    . . f f d d d d d d f f . . 
    . . e f e 4 4 4 4 e f e . . 
    . e 4 f b 3 3 3 3 b f 4 e . 
    . 4 d f 3 3 3 3 3 3 c d 4 . 
    . 4 4 f 6 6 6 6 6 6 f 4 4 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
    `, SpriteKind.pokladnicka)
tiles.placeOnTile(pokladnickavlavo, tiles.getTileLocation(2, 16))
pokladnickavpravo = sprites.create(img`
    . f f f . f f f f . f f f . 
    f f f f f c c c c f f f f f 
    f f f f b c c c c b f f f f 
    f f f c 3 c c c c 3 c f f f 
    . f 3 3 c c c c c c 3 3 f . 
    . f c c c c 4 4 c c c c f . 
    . f f c c 4 4 4 4 c c f f . 
    . f f f b f 4 4 f b f f f . 
    . f f 4 1 f d d f 1 4 f f . 
    . . f f d d d d d d f f . . 
    . . e f e 4 4 4 4 e f e . . 
    . e 4 f b 3 3 3 3 b f 4 e . 
    . 4 d f 3 3 3 3 3 3 c d 4 . 
    . 4 4 f 6 6 6 6 6 6 f 4 4 . 
    . . . . f f f f f f . . . . 
    . . . . f f . . f f . . . . 
    `, SpriteKind.pokladnicka)
tiles.placeOnTile(pokladnickavpravo, tiles.getTileLocation(6, 16))
snickerska = sprites.create(img`
    . . . . f f f f . . . . . 
    . . f f 1 f f f f f . . . 
    . f f 1 1 f f 1 f f f . . 
    f f f f f f 1 1 1 1 f 1 . 
    f f f 1 f f f f f f f 1 . 
    1 1 1 f f f e e f f 1 1 . 
    f f f f f e e f f 1 1 f . 
    f f f b f e e f b f f f . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 2 2 2 2 b f e f . 
    e 4 f 2 2 2 2 2 2 f 4 e . 
    e e f 1 1 1 1 1 1 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.predavacka)
tiles.placeOnRandomTile(snickerska, sprites.dungeon.floorLight0)
let vertikalpredavacka = sprites.create(img`
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    . . . . . . . . . . . . . 
    `, SpriteKind.vzduch)
tiles.placeOnTile(vertikalpredavacka, tiles.getTileLocation(15, 6))
game.onUpdateInterval(2000, function () {
    if (Math.percentChance(20 + info.score())) {
        predavacka1.setVelocity(randint(-50, -70), 0)
    } else {
        if (Math.percentChance(20 + info.score())) {
            predavacka1.setVelocity(randint(50, 70), 0)
        }
    }
    if (Math.percentChance(20 + info.score())) {
        predavacka2.setVelocity(randint(-50, -70), 0)
    } else {
        if (Math.percentChance(20 + info.score())) {
            predavacka2.setVelocity(randint(50, 70), 0)
        }
    }
})
game.onUpdateInterval(2000, function () {
    if (info.score() >= 10) {
        if (Math.percentChance(25 + info.score())) {
            vertikalpredavacka.setVelocity(0, randint(-50, -70))
        } else {
            if (Math.percentChance(25 + info.score())) {
                vertikalpredavacka.setVelocity(0, randint(50, 70))
            }
        }
    }
})
forever(function () {
    if (mySprite.overlapsWith(tutorialpos)) {
        tutorialman.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f . . . . . 
            . . . f f e e e e f 2 f . . . . 
            . . f f e e e e f 2 2 2 f . . . 
            . . f e e e f f e e e e f . . . 
            . . f f f f e e 2 2 2 2 e f . . 
            . . f e 2 2 2 f f f f e 2 f . . 
            . f f f f f f f e e e f f f . . 
            . f f e 4 4 e b f 4 4 e e f . . 
            . f e e 4 d 4 1 f d d e f . . . 
            . . f e e e e e d d d f . . . . 
            . . . . f 4 d d e 4 e f . . . . 
            . . . . f e d d e 2 2 f . . . . 
            . . . f f f e e f 5 5 f f . . . 
            . . . f f f f f f f f f f . . . 
            . . . . f f . . . f f f . . . . 
            `)
        tutorialman.say("A - Tutorial", 1000)
    } else {
        tutorialman.setImage(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    }
})
forever(function () {
    info.setLife(boxy)
})
forever(function () {
    if (predavacka1.isHittingTile(CollisionDirection.Right)) {
        predavacka1.setVelocity(50, 0)
    }
    if (predavacka1.isHittingTile(CollisionDirection.Left)) {
        predavacka1.setVelocity(50, 0)
    }
    if (predavacka2.isHittingTile(CollisionDirection.Right)) {
        predavacka2.setVelocity(50, 0)
    }
    if (predavacka2.isHittingTile(CollisionDirection.Left)) {
        predavacka2.setVelocity(50, 0)
    }
})
forever(function () {
    if (predavacka1.isHittingTile(CollisionDirection.Right)) {
        predavacka1.setVelocity(randint(-50, -70), 0)
    }
    if (predavacka1.isHittingTile(CollisionDirection.Left)) {
        predavacka1.setVelocity(randint(50, 70), 0)
    }
    if (predavacka2.isHittingTile(CollisionDirection.Right)) {
        predavacka2.setVelocity(randint(-50, -70), 0)
    }
    if (predavacka2.isHittingTile(CollisionDirection.Left)) {
        predavacka2.setVelocity(randint(50, 70), 0)
    }
    if (vertikalpredavacka.isHittingTile(CollisionDirection.Bottom)) {
        vertikalpredavacka.setVelocity(0, randint(-50, -70))
    }
    if (vertikalpredavacka.isHittingTile(CollisionDirection.Top)) {
        vertikalpredavacka.setVelocity(0, randint(50, 70))
    }
})
forever(function () {
    if (controller.left.isPressed()) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d e e e e e f . . . 
            . . . f e 4 e d d 4 f . . . . . 
            . . . f 2 2 e d d e f . . . . . 
            . . f f 5 5 f e e f f f . . . . 
            . . f f f f f f f f f f . . . . 
            . . . f f f . . . f f . . . . . 
            `)
    }
    if (controller.right.isPressed()) {
        mySprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . 4 d d e 4 4 4 e f . . . 
            . . . . e d d e 2 2 2 2 f . . . 
            . . . . f e e f 4 4 5 5 f f . . 
            . . . . f f f f f f f f f f . . 
            . . . . . f f . . . f f f . . . 
            `)
    }
    if (controller.up.isPressed()) {
        mySprite.setImage(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f e e e e f f . . . . 
            . . . f e e e f f e e e f . . . 
            . . f f f f f 2 2 f f f f f . . 
            . . f f e 2 e 2 2 e 2 e f f . . 
            . . f e 2 f 2 f f 2 f 2 e f . . 
            . . f f f 2 2 e e 2 2 f f f . . 
            . f f e f 2 f e e f 2 f e f f . 
            . f e e f f e e e e f e e e f . 
            . . f e e e e e e e e e e f . . 
            . . . f e e e e e e e e f . . . 
            . . e 4 f f f f f f f f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    }
    if (controller.down.isPressed()) {
        mySprite.setImage(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
    }
})
forever(function () {
    if (info.score() >= 10) {
        vertikalpredavacka.setImage(img`
            . . . . f f f f . . . . . 
            . . f f f f f f f f . . . 
            . f f f f f f c f f f . . 
            f f f f f f c c f f f c . 
            f f f c f f f f f f f c . 
            c c c f f f e e f f c c . 
            f f f f f e e f f c c f . 
            f f f b f e e f b f f f . 
            . f 4 1 f 4 4 f 1 4 f . . 
            . f e 4 4 4 4 4 4 e f . . 
            . f f f e e e e f f f . . 
            f e f b 2 2 2 2 b f e f . 
            e 4 f 2 2 2 2 2 2 f 4 e . 
            e e f 1 1 1 1 1 1 f e e . 
            . . . f f f f f f . . . . 
            . . . f f . . f f . . . . 
            `)
        vertikalpredavacka.setKind(SpriteKind.predavacka)
    }
})
