<template>
    <div class="container">
        <b-form>
            <b-form-group id="input-group-1" label="Digite os dados darrr operação:" label-for="input-quantidade">
                <div>
                    <b-form inline>
                        <b-form-input class="mb-2 mr-sm-2 mb-sm-0"
                                      id="input-codigo-da-acao"
                                      v-model="form.acao"
                                      placeholder="Código da Ação"
                                      required></b-form-input>
                        <b-form-input class="mb-2 mr-sm-2 mb-sm-0"
                                      id="input-quantidade"
                                      v-model="form.quantidade"
                                      placeholder="Quantidade"
                                      required></b-form-input>
                        <b-form-input class="mb-2 mr-sm-2 mb-sm-0"
                                      id="input-preco"
                                      v-model="form.preco"
                                      placeholder="Preço unitário"
                                      required></b-form-input>
                        <label class="mr-sm-2" for="inline-form-custom-select-corretora">Compra/Venda</label>
                        <b-form-select id="inline-form-custom-select-tipo"
                                       class="mb-2 mr-sm-2 mb-sm-0"
                                       v-model="form.selected_compra_venda"
                                       :options="options"></b-form-select>
                        <b-button class="mr-1" v-on:click="addToTable" variant="primary">Adicionar</b-button>
                        <b-button v-on:click="resetAllFields" variant="danger">Limpar</b-button>
                    </b-form>
                </div>
            </b-form-group>
            <br>


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
        </b-form>
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
                dismissSecs: 5,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                valor_reais: '',
                fields: ['Ação', 'Quantidade', 'Preco', 'Tipo_da_Operacao', 'Valor'],
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
            }
        },
        created() {

        },
    };
</script>
