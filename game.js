import kaboom from "kaboom";

kaboom({
    background: [0, 100, 150]
});

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

let score = 0;
test = [
    sprite("tree")
]

loadSprite("bunny", "sprites/bunny.png");
loadSprite("tree", "sprites/tree.png");

//scenes
scene("game", () => {
    const bunny = add([
        sprite("bunny"),
        area({ scale: 0.8 }),
        body(),
        pos(200, height() - 108),
        origin("botleft"),
        scale(2),
        color(220, 220, 220),
    ]);

    // add platform (ground)
    add([
        rect(width(), FLOOR_HEIGHT),
        pos(0, height() - FLOOR_HEIGHT),
        outline(4),
        area(),
        solid(),
        color(20, 240, 80),
    ]);

    function spawnTree() {
        add([
            test[0],
            //width(FLOOR_HEIGHT),
            //height(rand(24,64)),
            scale(0.6, rand(0.2, 0.8)),
            //rect(FLOOR_HEIGHT, rand(24, 64)),
            area({ scale: 0.8 }),
            //outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            origin("botleft"),
            //color(255, 180, 255),
            move(LEFT, SPEED),
            "tree", // add a tag here
        ]);
        wait(rand(0.5, 1.5), () => {
            spawnTree();
        });
    }

    // add trees
    spawnTree();


    //colliders config
    bunny.onCollide("tree", () => {
        addKaboom(bunny.pos);
        shake();
        go("lose");
    });

    //keymaps
    onKeyPress("w", () => {
        if (bunny.isGrounded()) {
            bunny.jump(JUMP_FORCE);
        }
    });

    onClick(() => {
        if (bunny.isGrounded()) {
            bunny.jump(JUMP_FORCE);
        }
    });

    //score section
    const scoreLabel = add([
        text(`Score: ${score}`),
        pos(24, 24)
    ]);

    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });
});

scene("lose", () => {
    add([
        sprite("bunny"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        origin("center"),
    ]);

    add([
        text(`Press "space" or "click" to restart`),
        pos(width() / 2, height() / 2 + 80),
        origin("center"),
        scale(0.5),
    ]);

    add([
        text("Game Over, your score: " + score),
        pos(center()),
        origin("center"),
        scale(0.8),
    ]);


    //keymaps
    onKeyPress("space", () => {
        go("game");
    });

    onClick(() => go("game"))
});

scene("start", () => {
    add([
        sprite("bunny"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        origin("center"),
    ]);

    add([
        text("testing game by juansebas257"),
        pos(center()),
        scale(0.5),
        origin("center"),
    ]);

    add([
        text(`Press "space" or "click" to start`),
        pos(width() / 2, height() / 2 + 80),
        scale(0.5),
        origin("center"),
    ]);


    //keymaps
    onKeyPress("space", () => {
        go("game");
    });

    onClick(() => {
        go("game");
    });
});

go("start");

/*
add([
    text("hello" + (height() - 48)),
    pos(120, 80),
]);
*/