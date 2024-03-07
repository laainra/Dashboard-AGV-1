<template>
  <table class="container">
    <thead>
      <tr>
        <template v-for="(column, index) in columns" :key="index">
          <th>{{ column }}</th>
        </template>
        <!-- Add a header column for actions -->
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(row, i) in data" :key="i">
        <tr>
          <template v-for="(column, colIndex) in columns" :key="colIndex">
            <td>{{ row[column] }}</td>
          </template>
          <!-- Add action buttons for each row -->
          <td>
            <!-- Edit button -->
            <button class="button-table orange" @click="editRow(row)">
              Edit
            </button>
            <!-- Remove button -->
            <button class="button-table red" @click="removeRow(row)">
              Remove
            </button>
            <!-- Handle button -->
            <button class="button-table blue" @click="handleRow(row)">
              Handle
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "BaseTable",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    editRow(row) {
      // Emit edit event with the selected row
      this.$emit("edit-row", row);
    },
    removeRow(row) {
      // Emit remove event with the selected row
      this.$emit("remove-row", row);
    },
    handleRow(row) {
      // Emit handle event with the selected row
      this.$emit("handle-row", row);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1.5rem;
}
.button-table {
  padding: 0.5rem;
  border: none;
  outline: none;
  margin-left: 0.5rem;
}

.red {
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: rgb(255, 76, 76);
  color: white;
  border: none;
  outline: none;
  font-weight: 400;
}
.red:hover {
  background-color: rgb(255, 0, 0);
}

.orange {
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: rgb(255, 184, 54);
  color: white;
  border: none;
  outline: none;
  font-weight: 400;
}
.orange:hover {

  background-color: rgb(255, 166, 0);

}
.blue {
  border-radius: 0.3rem;
  background-color: rgb(26, 140, 216);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 400;
}
.blue:hover {
  background-color: rgb(0, 153, 255);
}
</style>
