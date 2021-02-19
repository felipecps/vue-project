<template>
    <div class="container">
        <b-form>
            <b-form-group id="input-group-1" label="Digite os dados da operação:">
                <div>
                    <b-form inline>
                        <b-form-input class="mb-2 mr-sm-2 mb-sm-0"
                                      id="input-codigo-da-acao"
                                      v-model="acao"
                                      placeholder="Código da Ação"
                                      required></b-form-input>
                        <b-form-input class="mb-2 mr-sm-2 mb-sm-0"
                                      id="input-quantidade"
                                      v-model="quantidade"
                                      placeholder="Quantidade"
                                      required></b-form-input>
                        <b-form-input class="mb-2 mr-sm-2 mb-sm-0"
                                      id="input-preco"
                                      v-model="preco"
                                      placeholder="Preço unitário"
                                      required></b-form-input>
                        <label class="mr-sm-2" for="inline-form-custom-select-corretora">Compra/Venda</label>
                        <b-form-select id="inline-form-custom-select-tipo"
                                       class="mb-2 mr-sm-2 mb-sm-0"
                                       v-model="selected"
                                       :options="options"></b-form-select>
                        <b-button class="mr-1" v-on:click="addToTable" variant="primary">Adicionar</b-button>
                        <b-button v-on:click="resetAllFields" variant="danger">Limpar</b-button>
                    </b-form>
                </div>
            </b-form-group>
            <br>
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
                acao: '',
                quantidade: '',
                preco: '',
                tipo_de_operacao: '',
                selected: null,
                fields: ['Acao', 'Quantidade', 'Preco', 'Tipo_da_Operacao'],
                options: [
                    { value: null, text: 'Escolha...' },
                    { value: 'Compra', text: 'Compra' },
                    { value: 'Venda', text: 'Venda' }
                ],
                items: []
            };
        },
        methods: {
            addToTable() {
                this.items.push({ Acao: this.acao, Quantidade: this.quantidade, Preco: this.preco, Tipo_da_Operacao: this.selected })
            },
            resetAllFields() {
                this.acao = ''
                this.quantidade = ''
                this.preco = ''
            }
        },
        created() {

        },
    };
</script>
