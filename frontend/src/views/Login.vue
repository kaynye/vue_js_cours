<template>
    <div class="vue-tempalte">
        <form>
            <h3>Se connecter</h3>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <b-button type="submit" class="mt-4" variant="primary">Valider</b-button>
        </form>
    </div>
</template>

<style>
form{
  width: 60%;
  border: 1px solid #ccc;
  margin: 10% auto;
  padding: 10px;
  border-radius: 16px;
}
</style>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>
