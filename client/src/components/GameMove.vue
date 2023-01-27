<template>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Data"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"

                ></v-text-field>
              </template>

              <v-date-picker
                  v-model="date"
                  :min="nowDate"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
              cols="11"
              sm="5"
          >
            <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="time"
                    label="Godzina"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                  v-if="modal2"
                  v-model="time"
                  format="24hr"
                  full-width
              >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="modal2 = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(time)"
                >
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                label="Miejsce"
                v-model="place"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions
      >
        <v-spacer></v-spacer>
      <v-btn
          color="blue darken-1"
          text
          @click="move(data._id)"
      >
        ZAPISZ
      </v-btn>
        </v-card-actions
        >
    </v-card-text>

</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "@/router";

const props = defineProps({
  meetId: {
    type: String
  }
})

const data = ref('')
const date = ref('')
const time = ref('')
const place = ref('')
const nowDate = new Date().toISOString().slice(0,10)


onMounted(async () => {
  const res =  await axios.get('api/listMeets/' + props.meetId);
  data.value = res.data;
})

async function move(id) {
  const res = await axios.put('api/listMeets/' + id, {
    meeting_date: date.value + "T" + time.value,
    place: place.value
  });
  console.log(res)
  if(res.status == 200) {
    await axios.put('api/listMeets/squad/' + id);
    window.location.reload();
  }else{
    console.log("Błędne dane")
  }
}
</script>
<script>
import GameList from "@/components/GameList.vue";

export default {
  components: {GameList},
  data() {
    return {
      menu: false,
      menu2: false,
      modal2: false,
    }
  }
}
</script>