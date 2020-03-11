#!/bin/bash

# Criação da base 'moodle'
echo -n "Criando base Moodle..."
mysql < moodle.sql
echo " pronto."

# Permissão de acesso a base 'moodle'
echo -n "Adicionando permissão de acesso a base Moodle..."
mysql <<EOF
GRANT ALL PRIVILEGES ON moodle.* TO 'usuario'@'localhost' IDENTIFIED BY 'senha';
FLUSH PRIVILEGES;
EOF
echo " pronto."

# Configuração do Moodle
echo -n "Configurando Moodle..."
cat > ../moodle-master/config.php <<EOF
<?php  // Moodle configuration file

unset(\$CFG);
global \$CFG;
\$CFG = new stdClass();

\$CFG->dbtype    = 'mysqli';
\$CFG->dblibrary = 'native';
\$CFG->dbhost    = 'localhost';
\$CFG->dbname    = 'moodle';
\$CFG->dbuser    = 'usuario';
\$CFG->dbpass    = 'senha';
\$CFG->prefix    = 'mdl_';
\$CFG->dboptions = array (
  'dbpersist' => 0,
  'dbport' => '',
  'dbsocket' => '',
  'dbcollation' => 'utf8mb4_general_ci',
);

\$CFG->wwwroot   = 'URL do Gitpod em HTTP';
\$CFG->dataroot  = '/workspace/serviceworker2/moodledata';
\$CFG->admin     = 'admin';

\$CFG->directorypermissions = 0777;

require_once(__DIR__ . '/lib/setup.php');

// There is no php closing tag in this file,
// it is intentional because it prevents trailing whitespace problems!
EOF
echo " pronto."