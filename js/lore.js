class Lore {
    constructor({
        shown = false,
        requirement,
        text,
        gain = [],
    }) {
        this.shown = shown;
        this.requirement = requirement;
        this.text = text;
        this.gain = gain;
    }
}

export const lores = {
    startGame: new Lore({
        requirement: (game) => game.age >= 6 * 365,
        text: "There is nothing. An infinite void of endless black. And then, light.  <br> <br> You find yourself reborn in a new world. The first six years of your life pass quickly as you adjust to your new body. Today your parents decide it's time for you to learn how to work the land.",
    }),
    age16: new Lore({
        requirement: (game) => game.age >= 16 * 365,
        text: "You just turned 16. It’s time for you to leave home. <br> <br> Your parents give you a small parcel of land and an old set of tools. <br> <br> It’s not much, but what you grow will keep you fed. Maybe one day you’ll even make a profit.",
        gain: ["New Action"],
    }),
    firstCoin: new Lore({
        requirement: (game) => game.flags.showCoins.value,
        text: "For the first time, you have made more than what you need to survive. You went to a local market and sold your surplus, earning your first bit of coin. <br> <br> Perhaps if you earn enough, you can replace your old tools.",
        gain: ["New Mechanic"],
    }),
    secondLife: new Lore({
        requirement: (game) => game.lives >= 2,
        text: "Death arrives. Once again, light follows darkness and you return to life as a newborn babe.<br> <br>The knowledge you earned in your past life persists, but the muscle memory is gone. You will need to re-earn that experience.<br> <br>Hopefully the knowledge you retained will speed up that process.",
        gain: [],
    }),
    unlockSmithing: new Lore({
        requirement: (game) => game.flags.unlockSmithing.value,
        text: "Lives come and go. Over time, you  grow bored of working on a farm. The local smith is willing to teach you his craft, but not for free. <br> <br> You will also need to buy supplies. Spending your days in the forge won’t put any food on your table.",
        gain: ["New Skill", "New Action"],
    }),
    smithing2: new Lore({
        requirement: (game) => game.skills.smithing.knowledgeLevel >= 1 && game.age >= 12 * 365 && game.age <= 22 * 365,
        text: "Your knowledge of smithing and quick learning has impressed the local smith. He is willing to take you as an apprentice.  <br> <br> He gives you ten years to learn his craft and during that time, he will provide for your basic comfort.  <br> <br> Should you fail to master the basics in time you will be on your own. Unless you pay, of course.",
        gain: ["New Action"],
    }),
    farming3: new Lore({
        requirement: (game) => game.skills.farming.experienceLevel >= 8 && game.upgrades.farmingUpgrade3.bought,
        text: "You have hired farm hands to help tend your fields. <br> <br> You now have time to turn your attention to the bigger picture. Crop rotation, blight prevention, taxes. While you might not spend all day in the sun, your work is still far from over.",
        gain: ["New Action"],
    }),
    smithing3: new Lore({
        requirement: (game) => game.skills.smithing.experienceLevel >= 2 && game.age >= 16 * 365,
        text: "Your craftsmanship has finally reached a satisfactory level. You bid your master goodbye and set up your own smithy. You now have to provide for yourself, but it feels good to be your own boss.",
        gain: ["New Action"],
    }),
    unlockFighting: new Lore({
        requirement: (game) => game.flags.unlockFighting.value,
        text: "Your time working the forge has paid off, and your strength has grown quite impressive. The local watch has taken notice and offered you a spot as a trainee, despite your lack of fighting ability. <br> <br> However, should your body weaken, you will be kicked out of training. Perhaps if your fighting knowledge increases, your spot among the trainees would be secure.",
        gain: ["New Skill", "New Action"],
    }),
    fighting2: new Lore({
        requirement: (game) => game.skills.fighting.experienceLevel >= 4,
        text: "The years of training have finally born fruit. You are no longer a mere trainee, but instead a full-fledged member of the watch. Each day you stand guard, fighting back the monsters that seek to harm those under your protection.",
        gain: ["New Action"],
    }),
    fighting3: new Lore({
        requirement: (game) => game.skills.fighting.experienceLevel >= 10,
        text: "Your strength and skill is undeniable and within the village, no one is your match. You take over as commander of the watch.",
        gain: ["New Action"],
    }),
    synergy: new Lore({
        requirement: (game) => game.flags.unlockSynergy.value,
        text: "For the entirety of your rebirths, the paths you have followed have felt distinct and disjointed. No more. Something clicks, and you realize each path is not as different as you first believed.",
        gain: ["New Mechanic"],
    }),
    synergyFarming: new Lore({
        requirement: (game) => game.flags.unlockSynergy.value && game.skills.farming.knowledgeLevel >= 8,
        text: "Your years on a farm have taught you a lot about plants. You know which plants cure illness or ease aching bones. As your farming experience grows, so will your life expectancy.",
        gain: ["New Mechanic"],
    }),
    synergySmithing: new Lore({
        requirement: (game) => game.flags.unlockSynergy.value && game.skills.smithing.knowledgeLevel >= 8,
        text: "You have spent many lives toiling in the hot forge, and your time has not been wasted. Your craftsmanship exceeds most others. <br> <br> Instead of spending coins on tools and weapons, you buy the materials and forge them yourself, creating items of far greater quality.",
        gain: ["New Mechanic"],
    }),
    synergyFighting: new Lore({
        requirement: (game) => game.flags.unlockSynergy.value && game.skills.fighting.knowledgeLevel >= 8,
        text: "Your time as a member and commander of the watch has taught you much about strength and the human body. You take this experience and bring it to your other walks in life, increasing the rate your body grows, even when swinging a hammer or scythe, instead of a sword.",
        gain: ["New Mechanic"],
    }),
    bodyCap20: new Lore({
        requirement: (game) => game.bodyLevel >= 20,
        text: "You’ve felt it for a while now. Your body has reached its limit. No matter how much you train, your strength stays the same. Perhaps as your fighting skills improve, you will find a way past this barrier.",
        gain: ["New Mechanic"],
    }),
    bodyUncap20: new Lore({
        requirement: (game) => game.flags.uncapBody20.value,
        text: "A great beast has come from the forest. You alone stand between it and the village. <br> <br> As you do battle, a strange energy washes over you. You are the master of your body. Your limits exist only as long as you let them. <br> <br> A crack rings out, and the barrier is broken. Your body can improve past its limit and the rate at which your body grows has increased as well.",
        gain: ["Body Uncapped"],
    }),
    spiritUnlock: new Lore({
        requirement: (game) => game.skills.farming.experienceLevel >= 12,
        text: "You sit in your field and reflect on how far you’ve come. As you reminisce, a strange calm rushes over you and you fall into a trance. <br> <br> When you awaken, several days have passed. You feel an intense connection to yourself and your spirit. ",
        gain: ["New Trait"],
    }),
    unlockMeditation: new Lore({
        requirement: (game) => game.flags.unlockMeditating.value,
        text: "Something feels different about this life. The energy you felt at your farm has remained inside you. When you close your eyes and concentrate, you can almost touch it. Something tells you the higher your experience the faster your spirit will grow. <br> <br> However, you must be careful. Should you focus too much on your meditation and forget your earthly needs, you will surely suffer for it.",
        gain: ["New Skill", "New Action"],
    }),
    spirit1: new Lore({
        requirement: (game) => game.spiritLevel >= 1,
        text: "Your spirit has grown in strength. And with its growth, your ability to change mental knowledge into practical experience has grown. As your spirit grows, so too will this new ability.",
        gain: ["New Mechanic"],
    }),
    unlockTrading: new Lore({
        requirement: (game) => game.flags.unlockTrading.value,
        text: "You have earned a lot of money throughout your many lives. But you’ve never truly given it much thought. Perhaps in a future life you should pull a new thread and see where it leads.",
        gain: ["New Skill"],
    }),
    trading1: new Lore({
        requirement: (game) => game.flags.unlockTrading.value && game.age >= 12 * 365,
        text: "You approach a local store owner and attempt to convince them to let you run their market stall. They are impressed by your pitch and agree to grant you an apprenticeship. You have ten years to learn their trade before they kick you out.",
        gain: ["New Action"],
    }),
    trading2: new Lore({
        requirement: (game) => game.skills.trading.experienceLevel >= 2 && game.age >= 16 * 365,
        text: "Your trade acumen has grown greatly, and so has your wallet. You are ready to set out on your own to open your first store. If you're lucky, you will make more than enough to provide for yourself.",
        gain: ["New Action"],
    }),
    trading3: new Lore({
        requirement: (game) => game.skills.trading.experienceLevel >= 8 && game.age >= 16 * 365,
        text: "Your reputation as a shrewd merchant has grown. During the most recent guild meeting, you were voted in as the new guild leader. <br> <br> Of course you won’t let your new position get in the way of making a profit.",
        gain: ["New Action"],
    }),
    synergyTrading: new Lore({
        requirement: (game) => game.flags.unlockSynergy.value && game.skills.trading.knowledgeLevel >= 10,
        text: "Your knowledge of trading has grown immensely. No matter your career, you are confident you will be lucrative. ",
        gain: ["New Mechanic"],
    }),
    unlcokExploration: new Lore({
        requirement: (game) => game.age >= 16 * 365 && game.bodyLevel >= 15 && game.skills.fighting.knowledgeLevel >= 4,
        text: "Despite your time in the watch, you have never strayed far from your home. To leave is dangerous. Monsters, brigands and worse make their home in the woods beyond the walls. <br> <br> Nonetheless, you find yourself called to adventure. You plan to proceed cautiously. A strong body and fighting experience is a necessity. You will also need enough coins to buy supplies for your travels.",
        gain: ["New Skill", "New Action"],
    }),
    explortation2: new Lore({
        requirement: (game) => game.age >= 16 * 365 && game.bodyLevel >= 18 && game.skills.fighting.knowledgeLevel >= 8,
        text: "The boundary has grown boring. What was once new and exciting has grown predictable and mundane. You set your sights on the deeper woods and greater challenges. Providing of course your body and fighting skills can keep up.",
        gain: ["New Action"],
    }),
    tradingUnlock1: new Lore({
        requirement: (game) => game.skills.trading.knowledgeLevel >= 4,
        text: "Your foray into the market has left you with new connections and access to unobtainable goods. You can now buy an artifact to help you meditate",
        gain: ["New Upgrade"],
    }),
    tradingUnlock2: new Lore({
        requirement: (game) => game.skills.trading.knowledgeLevel >= 6,
        text: "Your connections grow. You can now buy higher quality supplies to improve your everyday life. Your new lifestyle also brings about an increase in how quickly you learn and grow, at least for as long as you can afford it.",
        gain: ["New Supplies"],
    }),
    tradingUnlock3: new Lore({
        requirement: (game) => game.skills.trading.knowledgeLevel >= 8,
        text: "Your knowledge of the market has grown. Your connections outside your humble home grant you access to a higher tier of the market. You can now spend coin to further improve some of your original skills.",
        gain: ["New Upgrades"],
    }),


    

    
}

let activeLore = false;

export function changeActiveLore(){
    activeLore = false;
}

export function unlockLore(game){
    for (const lore of Object.values(lores)) {
        if (!lore.shown && lore.requirement(game) && !activeLore) {
            lore.shown = true;
            activeLore = true;
            return lore;
        }
    }

    return null
}