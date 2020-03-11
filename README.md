[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/roicenir/serviceworker2) 

# Para instalar

Toda a instalação é automatizada no arquivo `.gitpod.yml`, mas especificamente o script `install.sh`.

Entretanto, deve-se reconfigurar a URL base do Moodle de acordo com a instância do Gitpod: no arquivo `moodle-master/config.php`, o atributo `$CFG->wwwroot`. Atenção: a URL deve estar com o protocolo `http`, e não `https`, ser acrescida o parâmetro para definir a porta `8001` do HTTP, e remover a parte do recurso (_ resource_) do endereço final.

Por exemplo: a URL do Gitpod é `https://fde9cd93-21b9-42d6-b09a-c454b57555c9.ws-us02.gitpod.io/#/workspace/serviceworker2`, então a configuração deve ficar assim:

```php
$CFG->wwwroot   = 'http://8001-fde9cd93-21b9-42d6-b09a-c454b57555c9.ws-us02.gitpod.io';
```

O usuário padrão é `admin` e senha `Admin123#`.

# Para usar

O Moodle está pronto para uso na aba de previsualização do Gitpod.