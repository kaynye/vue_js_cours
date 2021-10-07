<template>
<div>
  <b-navbar toggleable="sm" type="light" variant="light">
    <b-navbar-toggle target="nav-text-collapse br"></b-navbar-toggle>

    <b-navbar-brand>Groupomania Social</b-navbar-brand>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-text> <router-link to="/">Se connecter</router-link> </b-nav-text>
      </b-navbar-nav>


    </b-collapse>

    <b-collapse id="nav-text-collapse" is-nav>
      <b-navbar-nav>
            <b-nav-text> <router-link to="/register">S'inscrire</router-link></b-nav-text>
      </b-navbar-nav>


    </b-collapse>

    
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    // msg: String
  }
}
</script>
