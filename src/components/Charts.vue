<template>
  <h3 class="charts-title">Top linguagens</h3>
  <h5 class="charts-subtitle">(Por número de repositórios)</h5>
  <div class="charts-content">
    <svg width="200" viewBox="0 0 50 41">
      <g
        transform="translate(4.5, -9) scale(1) rotate(-90)"
        style="transform-origin: 50% 50%"
      >
        <g>
          <circle
            fill="none"
            stroke="#dcdcdc"
            stroke-width="7"
            r="16"
            cx="16"
            cy="16"
            :stroke-dasharray="`${donutData.total} ${donutData.total}`"
            stroke-dashoffset="-0"
          ></circle>
        </g>
        <g>
          <circle
            v-for="(circle, i) in arrStats"
            :key="circle.language + i"
            fill="none"
            :stroke="circle.language_color"
            stroke-width="7"
            r="16"
            cx="16"
            cy="16"
            :stroke-dasharray="circle.dasharray"
            :stroke-dashoffset="circle.dashoffset"
          ></circle>
        </g>

        <g>
          <circle
            fill="none"
            stroke="#fff"
            stroke-width="7"
            r="16"
            cx="16"
            cy="16"
            :stroke-dasharray="`0.3872 ${donutData.total}`"
            stroke-dashoffset="-0"
          ></circle>
        </g>
        <g>
          <circle
            v-for="circle in arrStats"
            :key="circle.separator_position"
            fill="none"
            stroke="#fff"
            stroke-width="7"
            r="16"
            cx="16"
            cy="16"
            :stroke-dasharray="circle.separator_dasharray"
            :stroke-dashoffset="circle.separator_position"
          ></circle>
        </g>
      </g>
    </svg>

    <svg width="200" viewBox="0 0 135 105">
      <g transform="translate(0, 10)">
        <g v-for="circle in arrStats" :key="circle.rect_position">
          <g>
            <rect
              x="0"
              :y="circle.rect_position"
              rx="2"
              width="100"
              height="8"
              fill="#9d9d9d"
            />
            <rect
              x="0"
              :y="circle.rect_position"
              rx="2"
              :width="circle.percentage"
              height="8"
              :fill="circle.language_color"
            />
          </g>
          <g
            text-anchor="start"
            style="fill: #505050; font-size: 0.5rem"
            transform="translate(103, 6)"
          >
            <text x="0" :y="circle.rect_position">
              {{ circle.percentage.toFixed(2) }}%
            </text>
          </g>
          <g
            text-anchor="start"
            style="fill: #505050; font-size: 0.5rem"
            transform="translate(2, -3)"
          >
            <text x="0" :y="circle.rect_position">
              {{ circle.language }}
            </text>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Charts",

  data() {
    return {
      donutData: { total: ((2 * 22) / 7) * 16 },
      arrStats: [],
    };
  },

  computed: {
    stats() {
      return this.$store.state.userStats;
    },
  },

  created() {
    const arr = this.stats.topLanguages;
    
    let othersIndex = arr.findIndex((item) => item.language === "Outros");
    let cutEl = arr.splice(othersIndex, 1);
    arr.push(...cutEl);

    const donutTotal = this.donutData.total;
    const totalPercentage = arr.reduce((acc, obj) => acc + obj.ocurrences, 0);

    const percentage = (item) => (donutTotal * item) / 100;

    if (arr.length > 5) {
      let arrInitial = [...arr];
      let rest = [...arrInitial.splice(4)];
      let restObj = {
        language: "Outros",
        ocurrences: rest.reduce((acc, obj) => acc + obj.ocurrences, 0),
        language_color: "#505050",
      };

      this.arrStats.push(...arrInitial, restObj);
    } else this.arrStats.push(...arr);

    let dashoffset = -0;
    let rectPosition = 0;

    this.arrStats.map((item) => {
      item["percentage"] = (item.ocurrences * 100) / totalPercentage;
      item["dasharray"] = `${percentage(item.percentage)} ${donutTotal}`;
      item["dashoffset"] = dashoffset;
      item["separator_dasharray"] = `0.3872 ${donutTotal}`;
      item["separator_position"] = dashoffset - percentage(item.percentage);
      item["rect_position"] = rectPosition;

      dashoffset -= percentage(item.percentage);
      rectPosition += 20;
      return item;
    });
  },
};
</script>

<style scoped>
.charts-subtitle {
  margin: 0 0 10px 0;
  font-weight: 100;
}

.charts-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>