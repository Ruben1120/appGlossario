import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Button, TextInput, ActivityIndicator} from 'react-native';

import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';

import Logo from '../imagens/logo.png';

class Login extends Component{

  loginAdministrador(email, senha){
    this.setState({carregamento: true});

    if(email != '' && senha != ''){
      firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(() => {
        Actions.insereTermos();
        this.setState({carregamento: false});
      })
      .catch(erro => {
        this.setState({erro: "Verifique seu e-mail ou senha."});
        this.setState({carregamento: false});
      });
    }else{
      this.setState({erro: "Informações insuficientes."});
      this.setState({carregamento: false});
    }
  }

  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
      erro: '',
      carregamento: false
    }
  }

  renderBotaoEntrar(){
    if(this.state.carregamento){
      return(
        <ActivityIndicator size="large" color="#359830" />
      );
    }else{
      return(
        <Button onPress={() => {this.loginAdministrador(this.state.email, this.state.senha)}} title="Entrar" color="#359830" />
      );
    }
  }

  render(){
    return(
      <View style={styles.containerPrincipal}>

        <View style={styles.containerLogo}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <View style={styles.containerInformacoes}>
          <Text style={styles.titulos}> Administração do Sistema </Text>
        </View>

        <View style={styles.containerInputs}>
          <TextInput
            placeholder="Digite seu E-mail"
            style={styles.inputs}
            value={this.props.email}
            autoCapitalize='none'
            onChangeText={texto => {this.setState({email: texto})}}
          />

          <TextInput
            placeholder="Digite sua Senha"
            secureTextEntry
            style={styles.inputs}
            value={this.props.senha}
            onChangeText={texto => {this.setState({senha: texto})}}
          />

          <Text style={styles.erro}> {this.state.erro} </Text>

        </View>

        <View>
          {this.renderBotaoEntrar()}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#ccc'
  },
  logo: {
    width: 263,
    height: 73
  },
  containerLogo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  containerInformacoes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titulos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#359830',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  inputs: {
    fontSize: 18,
    height: 45
  },
  containerInputs: {
    paddingLeft: 50,
    paddingBottom: 100,
    flex: 1
  },
  erro: {
    paddingTop: 10,
    color: '#CD0000',
    fontWeight: 'bold'
  }
});

export default Login;
