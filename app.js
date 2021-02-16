const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      playerMana: 0,
      isSpecialAttackAvailable: false,
      monsterHealth: 100,
      logs: [],
      gameOverMessage: {},
      isSurrend: false,
    };
  },
  watch: {
    playerMana(newMana) {
      this.isSpecialAttackAvailable = newMana >= 100 ? true : false;
    },
    playerHealth(newHealth) {
      if (newHealth <= 0)
        this.gameOverMessage = {
          message: `Player dead, monster won.`,
          className: "log--monster",
        };
    },
    monsterHealth(newHealth) {
      if (newHealth <= 0)
        this.gameOverMessage = {
          message: `Monster dead, player won`,
          className: "log--player",
        };
    },
  },
  computed: {
    gameOverStatus() {
      return this.playerHealth <= 0 || this.monsterHealth <= 0 ? true : false;
    },
  },
  methods: {
    playerRegularAttack() {
      const damage = Math.trunc(Math.random() * 10 + 1);
      this.monsterHealth -= damage;
      this.generateLogMessage(
        `Player attacked with regular skill (Damage: ${damage})`,
        "log--damage"
      );
      this.monsterAttack();
      this.chargeMana();
    },
    playerSpecialAttack() {
      if (this.playerMana >= 100) {
        const damage = 30;
        this.monsterHealth -= damage;
        this.playerMana -= 100;
        this.generateLogMessage(
          `Player attacked with special skill (Damage: ${damage})`,
          "log--player"
        );
        this.monsterAttack();
      }
    },
    chargeMana() {
      if (this.playerMana < 100) {
        const isLimitOver = this.playerMana + 20 > 100;
        this.playerMana = isLimitOver ? 100 : (this.playerMana += 20);
      }
    },
    heal() {
      if (this.playerHealth < 100) {
        this.playerHealth += 10;
        this.generateLogMessage(`Player healed (Heal: 10)`, "log--heal");
      }
    },
    monsterAttack() {
      const damage = Math.trunc(Math.random() * 7 + 1);
      this.playerHealth -= damage;
      this.generateLogMessage(
        `Monster attacked (Damage: ${damage})`,
        "log--monster"
      );
    },
    surrender() {
      this.isSurrend = true;
      this.gameOverMessage = {
        message: `Player surrend, monster won.`,
        className: "log--monster",
      };
    },
    generateLogMessage(message, className) {
      this.logs.push({ message, className });
    },
  },
});
app.mount("#game");
