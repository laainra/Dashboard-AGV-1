<script>
export default {
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    actions: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <template v-for="(column, index) in columns" :key="index">
          <th>{{ column }}</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-for="(row, i) in data" :key="i">
        <tr>
          <template v-for="column in columns" :key="column">
            <td>{{ row[column] }}</td>
          </template>
          <template v-if="actions.length">
            <td>
              <template v-for="(action, key) in actions" :key="key">
                <button @click="$emit(`${action.event}`, row)">
                  {{ action.title }}
                </button>
              </template>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss">
table {
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
}
</style>
