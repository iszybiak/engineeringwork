//courusel
<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <h1> Witaj na naszej stronie </h1> 
    <h2>Logowanie</h2>


      <v-spacer></v-spacer>

    
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
