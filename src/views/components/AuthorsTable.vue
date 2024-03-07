<script>
import { useListStore } from "../../store/todo";
import { mapState, mapActions } from "pinia";

// import component
import BaseInput from "../components/BaseInput.vue";
import BaseTable from "../components/BaseTable.vue";

const initialInput = {
  title: "",
  description: "",
  category: "",
  completed: false,
};

export default {
  name: "ListView",
  data: () => ({
    input: { ...initialInput },
    editing: false,

    table: {
      columns: ["id", "title", "description", "completed"],
      actions: [
        {
          title: "Handle",
          event: "handle-event",
        },
        {
          title: "Edit",
          event: "edit-event",
        },
        {
          title: "Remove",
          event: "remove-event",
        },
      ],
    },
  }),

  components: {
    BaseInput,
    BaseTable,
  },
  computed: {
    ...mapState(useListStore, ["getList", "getDetail"]),
  },
  async mounted() {
    await this.a$list();
  },
  methods: {
    ...mapActions(useListStore, ["a$list", "a$add", "a$edit", "a$delete"]),

    async handleEditEvent(row) {
      try {
        this.editing = row.id;
        this.input = { ...row };
      } catch (error) {
        console.error("Failed to prepare edit:", error);
      }
    },

    async addForm(event) {
      try {
        event.preventDefault();
        if (this.editing) {
          await this.a$edit({ id: this.input.id, data: this.input });
        } else {
          await this.a$add({ ...this.input });
        }

        this.resetForm();
      } catch (error) {
        console.error("Failed to add/edit entry:", error);
      }
    },

    async handleRemoveEvent(row) {
      try {
        await this.a$delete(row.id);
      } catch (error) {
        console.error("Failed to remove row:", error);
      }
    },

    resetForm() {
      this.input = { ...initialInput };
      this.editing = false;
    },
  },
};
</script>

<template>
  <div class="text-center mb-4">
    <h2 class="text-white">Create Your ToDo List</h2>
  </div>
  <div class="card">
    <div class="d-flex justify-between card-header pb-0">
      <h6>Login first, then input your ToDo List here 👇🏻</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2 d-flex flex-column">
      <form
        class="card-header"
        @submit.prevent="($event) => addForm($event)"
        method="post"
        @reset="() => resetForm()"
      >
        <base-input
          v-model="input.title"
          name="Title"
          class="input"
          placeholder="add new"
          required
        ></base-input>
        <br />

        <base-input
          v-model="input.description"
          name="Description"
          class="input"
          placeholder="description"
          required
        ></base-input>
        <br />

        <input v-model="input.completed" class="completed" type="checkbox" />
        Completed
        <br />

        <div class="button-action">
          <button type="reset" class="button-cancel">Cancel</button>
          <button type="submit" class="button-submit">
            {{ editing !== false ? "Edit" : "Add" }}
          </button>
        </div>
      </form>

      <div class="container table-responsive">
        <base-table
          class="table"
          :data="getList"
          :columns="table.columns"
          :actions="table.actions"
          @handle-row="handleLogEvent"
          @edit-row="handleEditEvent"
          @remove-row="handleRemoveEvent"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.completed {
  margin-bottom: 1rem;
}
.button-action {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
}
.button-submit {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  background: #2dce89;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 500;
  transition: transform 0.2s ease;
  font-weight: bold;
}

.button-submit:hover {
  transform: translateY(-5px);
}

.button-cancel {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
  background: #cccccc;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 500;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.button-cancel:hover {
  transform: translateY(-5px);
}
</style>