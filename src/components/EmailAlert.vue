<template>
   <div class="container">
      <b-form @submit="onSubmit" @reset="onReset" >
         <b-form-group
            id="input-group-1"
            label="Digite o Lembrete:"
            label-for="textarea"
            description="O lembrete vai ser enviado para os emails selecionados abaixo."
            >
            <b-row>
               <b-col sm="10">
                  <b-form-textarea
                     id="textarea"
                     placeholder="Texto"
                     rows="3"
                     v-model="form.text"
                     max-rows="8"
                     ></b-form-textarea>
               </b-col>
            </b-row>
         </b-form-group>
         <br>
         <b-form-group id="input-group-4">
            <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
               <b-form-checkbox value="felipePessoal">f@gm</b-form-checkbox>
               <b-form-checkbox value="felipeTrabalhoSs">f.x@ss</b-form-checkbox>
               <b-form-checkbox value="felipeTrabalhoSd">f.xa@sd</b-form-checkbox>
               <b-form-checkbox value="fernandaPessoal">F.R@gm</b-form-checkbox>
               <b-form-checkbox value="fernandaTrabalho">Fernanda@K.</b-form-checkbox>
            </b-form-checkbox-group>
         </b-form-group>
         <br>
         <b-button type="submit" variant="primary">Submit</b-button>
         <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
   </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'EmailAlert',
  data() {
    return {
        form: {
            text: '',
            checked: [],
        },
    };
  },
  methods: {
    onSubmit(evt) {
        evt.preventDefault()
        //alert(JSON.stringify(this.form))
        const listOfChecked = this.form.checked.toString()
        //alert(listOfChecked)
        const path = 'http://localhost:5000/envia_email'
        axios.post(
            path, 
            null, 
            {
                params: {
                    text: this.form.text,
                    checked: listOfChecked
                }
            })
        .then((res) => {
          console.log(res.data)
          this.msg = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        })
    },
    onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.text = ''
        this.form.checked = []
      }
  },
  created() {
    
  },
};
</script>
