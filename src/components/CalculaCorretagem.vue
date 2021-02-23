<template>
    <div class="container">
        <div>
            <b-card bg-variant="light" text-variant="black">
                <label for="input-valor">Valor:</label>
                <b-form-input id="input-valor"
                              v-model="valor_nota"
                              placeholder="Qual é o valor da nota?"
                              required></b-form-input>

                <b-form-group class="mt-3" label="Corretora:" v-slot="{ ariaDescribedby }">
                    <b-form-radio-group id="radio-group-1"
                                        v-model="corretora"
                                        :options="options_corretora"
                                        :aria-describedby="ariaDescribedby"
                                        name="radio-options"></b-form-radio-group>
                </b-form-group>
            </b-card>
        </div>





        <div>
            <b-card class="mt-3" bg-variant="light" text-variant="black">
                <b-form>
                    <label for="input-codigo-da-acao">Ação</label>
                    <b-form-input id="input-codigo-da-acao"
                                  v-model="form.acao"
                                  placeholder="Qual é o código da ação?"
                                  required></b-form-input>
                </b-form>
                <label class="mt-3" for="input-quantidade">Quantidade</label>
                <b-form-input id="input-quantidade"
                              v-model="form.quantidade"
                              placeholder="Quantas ações você comprou ou vendeu?"
                              required></b-form-input>
                <label class="mt-3" for="input-preco">Preço unitário</label>
                <b-form-input id="input-preco"
                              v-model="form.preco"
                              placeholder="Qual foi o preço unitário?"
                              required></b-form-input>
                <label class="mt-3" for="inline-form-custom-select-tipo">Compra/Venda</label>
                <b-form-select id="inline-form-custom-select-tipo"
                               v-model="form.selected_compra_venda"
                               :options="options"></b-form-select>
                <b-button class="mt-3" v-on:click="addToTable" variant="primary">Adicionar</b-button>
                <b-button class="mt-3" v-on:click="resetAllFields" variant="danger">Limpar</b-button>
            </b-card>
        </div>

        <b-alert :show="dismissCountDown"
                 dismissible
                 fade
                 variant="warning"
                 @dismiss-count-down="countDownChanged">
            Você precisa preencher todos os campos antes de adicionar!!
        </b-alert>

        <div>
            <b-table striped hover :items="items" :fields="fields"></b-table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'CalculaCorretagem',
        data() {
            return {
                form: {
                    acao: '',
                    quantidade: '',
                    tipo_de_operacao: '',
                    selected_compra_venda: null,
                    preco: '',
                },
                corretora: '',
                options_corretora: [
                    { value: 'xp', text: 'XP' },
                    { value: 'easynvest', text: 'Easynvest' }
                ],
                dismissSecs: 5,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                valor_reais: '',
                fields: ['Ação', 'Quantidade', 'Preco', 'Tipo_da_Operacao', 'Taxa de Liquidação', 'Valor'],
                options: [
                    { value: null, text: 'Escolha...' },
                    { value: 'Compra', text: 'Compra' },
                    { value: 'Venda', text: 'Venda' }
                ],
                items: []
            };
        },
        methods: {
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
            converter(valor) {
                var numero = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                return numero
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            addToTable() {
                if (this.form.acao != '' && this.form.quantidade != '' && this.form.preco != '' && this.form.selected_compra_venda != null) {
                    this.preco_editado = this.form.preco.replace(/,/g, '.')
                    let temp = this.form.quantidade * this.preco_editado
                    this.valor_reais = this.converter(temp)
                    this.items.push({ Ação: this.form.acao, Quantidade: this.form.quantidade, Preco: this.form.preco, Tipo_da_Operacao: this.form.selected_compra_venda, Valor:this.valor_reais })
                }
                else {
                    this.showAlert()
                }
            },
            resetAllFields() {
                this.form.acao = ''
                this.form.quantidade = ''
                this.form.preco = ''
                this.form.selected_compra_venda = null
                this.corretora = ''
                this.option_corretora = null
            }
        },
        created() {

        },
    };
</script>
