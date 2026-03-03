import React from 'react';
import { useState, useCallback } from "react";
import logoFalkon from './assets/logo-falkon.png';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// ─── DATABASE ────────────────────────────────────────────────────────────────
const PENAL = [
  { id:"CP001", art:"Art. 121", titulo:"Homicídio Simples", desc:"Matar alguém. Pena: reclusão de 6 a 20 anos." },
  { id:"CP002", art:"Art. 121 §2°", titulo:"Homicídio Qualificado", desc:"Homicídio praticado com motivação torpe, fútil, mediante emboscada, veneno, ou para assegurar outro crime. Pena: 12 a 30 anos." },
  { id:"CP003", art:"Art. 122", titulo:"Induzimento ao Suicídio", desc:"Induzir ou instigar alguém ao suicídio ou prestar-lhe auxílio para que o faça." },
  { id:"CP004", art:"Art. 123", titulo:"Infanticídio", desc:"Matar o próprio filho durante o parto ou logo após, sob influência do estado puerperal." },
  { id:"CP005", art:"Art. 124", titulo:"Aborto Provocado", desc:"Provocar aborto em si mesma ou consentir que outrem lho provoque. Pena: 1 a 3 anos de detenção." },
  { id:"CP006", art:"Art. 125", titulo:"Aborto Provocado por Terceiro", desc:"Provocar aborto sem o consentimento da gestante. Pena: reclusão de 3 a 10 anos." },
  { id:"CP007", art:"Art. 129", titulo:"Lesão Corporal", desc:"Ofender a integridade corporal ou a saúde de outrem. Pena: 3 meses a 1 ano de detenção." },
  { id:"CP008", art:"Art. 129 §1°", titulo:"Lesão Corporal Grave", desc:"Lesão que resulta em incapacidade por mais de 30 dias, perigo de vida, debilidade permanente de membro ou sentido." },
  { id:"CP009", art:"Art. 130", titulo:"Perigo de Contágio Venéreo", desc:"Expor alguém, por meio de relações sexuais ou ato libidinoso, a contágio de moléstia venérea de que sabe ou deve saber estar contaminado." },
  { id:"CP010", art:"Art. 131", titulo:"Perigo de Contágio de Moléstia Grave", desc:"Praticar ato capaz de produzir contágio de moléstia grave, com o fim de transmiti-la a outrem." },
  { id:"CP011", art:"Art. 132", titulo:"Perigo para a Vida ou Saúde", desc:"Expor a vida ou a saúde de outrem a perigo direto e iminente. Pena: 3 meses a 1 ano de detenção." },
  { id:"CP012", art:"Art. 133", titulo:"Abandono de Incapaz", desc:"Abandonar pessoa que está sob seu cuidado, guarda, vigilância ou autoridade e, por qualquer motivo, incapaz de defender-se dos riscos resultantes do abandono." },
  { id:"CP013", art:"Art. 135", titulo:"Omissão de Socorro", desc:"Deixar de prestar assistência a criança abandonada ou extraviada, ou a pessoa inválida ou ferida em lugar ermo." },
  { id:"CP014", art:"Art. 136", titulo:"Maus Tratos", desc:"Expor a perigo a vida ou a saúde de pessoa sob sua autoridade, guarda ou vigilância, para fim de educação, ensino, tratamento ou custódia." },
  { id:"CP015", art:"Art. 138", titulo:"Calúnia", desc:"Caluniar alguém, imputando-lhe falsamente fato definido como crime. Pena: 6 meses a 2 anos de detenção e multa." },
  { id:"CP016", art:"Art. 139", titulo:"Difamação", desc:"Difamar alguém, imputando-lhe fato ofensivo à sua reputação. Pena: 3 meses a 1 ano de detenção e multa." },
  { id:"CP017", art:"Art. 140", titulo:"Injúria", desc:"Injuriar alguém, ofendendo-lhe a dignidade ou o decoro. Pena: 1 a 6 meses de detenção ou multa." },
  { id:"CP018", art:"Art. 141", titulo:"Disposições Comuns (Crimes contra a Honra)", desc:"As penas aumentam-se de um terço se o crime é cometido contra o Presidente da República ou chefe de governo estrangeiro." },
  { id:"CP019", art:"Art. 146", titulo:"Constrangimento Ilegal", desc:"Constranger alguém, mediante violência ou grave ameaça, a não fazer o que a lei permite ou a fazer o que ela não manda." },
  { id:"CP020", art:"Art. 147", titulo:"Ameaça", desc:"Ameaçar alguém, por palavra, escrito ou gesto, de causar-lhe mal injusto e grave. Pena: 1 a 6 meses de detenção ou multa." },
  { id:"CP021", art:"Art. 147-A", titulo:"Perseguição (Stalking)", desc:"Perseguir alguém, reiteradamente e por qualquer meio, ameaçando-lhe a integridade física ou psicológica, restringindo-lhe a capacidade de locomoção." },
  { id:"CP022", art:"Art. 148", titulo:"Sequestro e Cárcere Privado", desc:"Privar alguém de sua liberdade, mediante sequestro ou cárcere privado. Pena: 1 a 3 anos de reclusão." },
  { id:"CP023", art:"Art. 149", titulo:"Redução à Condição Análoga à de Escravo", desc:"Reduzir alguém a condição análoga à de escravo, quer submetendo-o a trabalhos forçados ou exaustivos." },
  { id:"CP024", art:"Art. 150", titulo:"Violação de Domicílio", desc:"Entrar ou permanecer, clandestina ou astuciosamente, ou contra a vontade expressa de quem de direito, em casa alheia ou em suas dependências." },
  { id:"CP025", art:"Art. 151", titulo:"Violação de Correspondência", desc:"Devassar indevidamente o conteúdo de correspondência fechada, dirigida a outrem." },
  { id:"CP026", art:"Art. 153", titulo:"Divulgação de Segredo", desc:"Divulgar alguém, sem justa causa, conteúdo de documento particular ou de correspondência confidencial de que é destinatário ou detentor." },
  { id:"CP027", art:"Art. 154-A", titulo:"Invasão de Dispositivo Informático", desc:"Invadir dispositivo informático alheio, conectado ou não à rede de computadores, mediante violação indevida de mecanismo de segurança." },
  { id:"CP028", art:"Art. 155", titulo:"Furto", desc:"Subtrair, para si ou para outrem, coisa alheia móvel. Pena: 1 a 4 anos de reclusão e multa." },
  { id:"CP029", art:"Art. 155 §4°", titulo:"Furto Qualificado", desc:"Furto praticado com destruição de obstáculo, abuso de confiança, escalada ou destreza. Pena: 2 a 8 anos de reclusão e multa." },
  { id:"CP030", art:"Art. 157", titulo:"Roubo", desc:"Subtrair coisa móvel alheia, mediante grave ameaça ou violência. Pena: 4 a 10 anos de reclusão e multa." },
  { id:"CP031", art:"Art. 157 §3°", titulo:"Latrocínio", desc:"Roubo seguido de lesão corporal grave ou morte. Se resulta morte, pena de 20 a 30 anos de reclusão e multa." },
  { id:"CP032", art:"Art. 158", titulo:"Extorsão", desc:"Constranger alguém, mediante violência ou grave ameaça, a fazer, tolerar que se faça ou deixar de fazer alguma coisa para obter vantagem indevida." },
  { id:"CP033", art:"Art. 159", titulo:"Extorsão mediante Sequestro", desc:"Sequestrar pessoa com o fim de obter, para si ou para outrem, qualquer vantagem como condição do resgate. Pena: 8 a 15 anos de reclusão." },
  { id:"CP034", art:"Art. 163", titulo:"Dano", desc:"Destruir, inutilizar ou deteriorar coisa alheia. Pena: 1 a 6 meses de detenção ou multa." },
  { id:"CP035", art:"Art. 164", titulo:"Introdução ou Abandono de Animais", desc:"Introduzir ou deixar animais em propriedade alheia, sem consentimento de quem de direito, causando-lhe prejuízo." },
  { id:"CP036", art:"Art. 168", titulo:"Apropriação Indébita", desc:"Apropriar-se de coisa alheia móvel, de que tem a posse ou a detenção. Pena: 1 a 4 anos de reclusão e multa." },
  { id:"CP037", art:"Art. 169", titulo:"Apropriação de Coisa Achada", desc:"Apropriar-se alguém de coisa alheia perdida ou de que se apossou. Pena: 1 mês a 1 ano de detenção ou multa." },
  { id:"CP038", art:"Art. 171", titulo:"Estelionato", desc:"Obter vantagem ilícita em prejuízo alheio, induzindo ou mantendo alguém em erro, mediante artifício, ardil ou qualquer outro meio fraudulento. Pena: 1 a 5 anos de reclusão e multa." },
  { id:"CP039", art:"Art. 172", titulo:"Duplicata Simulada", desc:"Emitir fatura, duplicata ou nota de venda que não corresponda à mercadoria vendida, em quantidade ou qualidade, ou ao serviço prestado." },
  { id:"CP040", art:"Art. 173", titulo:"Abuso de Incapazes", desc:"Abusar, em proveito próprio ou alheio, de necessidade, paixão ou inexperiência de menor, ou da alienação ou debilidade mental de outrem." },
  { id:"CP041", art:"Art. 175", titulo:"Fraude no Comércio", desc:"Enganar, no exercício de atividade comercial, o adquirente ou consumidor, vendendo, como verdadeira ou perfeita, mercadoria falsificada ou deteriorada." },
  { id:"CP042", art:"Art. 178", titulo:"Emissão Irregular de Conhecimento de Depósito", desc:"Emitir conhecimento de depósito ou warrant que não corresponda a depósito, ou emiti-lo sem licença do depositante." },
  { id:"CP043", art:"Art. 180", titulo:"Receptação", desc:"Adquirir, receber, transportar ou ocultar coisa que sabe ser produto de crime. Pena: 1 a 4 anos de reclusão e multa." },
  { id:"CP044", art:"Art. 183", titulo:"Imunidades Penais (Crimes Patrimoniais)", desc:"Não se aplica a pena dos crimes patrimoniais quando o criminoso é cônjuge, ascendente ou descendente da vítima." },
  { id:"CP045", art:"Art. 213", titulo:"Estupro", desc:"Constranger alguém, mediante violência ou grave ameaça, a ter conjunção carnal ou praticar ato libidinoso. Pena: 6 a 10 anos de reclusão." },
  { id:"CP046", art:"Art. 215-A", titulo:"Importunação Sexual", desc:"Praticar contra alguém e sem sua anuência ato libidinoso com objetivo de satisfazer a própria lascívia ou a de terceiro. Pena: 1 a 5 anos de reclusão." },
  { id:"CP047", art:"Art. 216-A", titulo:"Assédio Sexual", desc:"Constranger alguém com o intuito de obter vantagem ou favorecimento sexual, prevalecendo-se o agente de sua condição de superior hierárquico." },
  { id:"CP048", art:"Art. 217-A", titulo:"Estupro de Vulnerável", desc:"Ter conjunção carnal ou praticar ato libidinoso com menor de 14 anos. Pena: 8 a 15 anos de reclusão." },
  { id:"CP049", art:"Art. 229", titulo:"Casa de Prostituição", desc:"Manter estabelecimento em que ocorra exploração sexual, haja ou não intuito de lucro. Pena: 2 a 5 anos de reclusão e multa." },
  { id:"CP050", art:"Art. 230", titulo:"Rufianismo", desc:"Tirar proveito da prostituição alheia, participando diretamente de seus lucros ou fazendo-se sustentar, no todo ou em parte, por quem a exerça." },
  { id:"CP051", art:"Art. 233", titulo:"Ato Obsceno", desc:"Praticar ato obsceno em lugar público ou acessível ao público. Pena: 3 meses a 1 ano de detenção ou multa." },
  { id:"CP052", art:"Art. 234", titulo:"Escrito ou Objeto Obsceno", desc:"Fazer, importar, exportar, adquirir ou ter sob sua guarda, para fim de comércio, objeto obsceno." },
  { id:"CP053", art:"Art. 241", titulo:"Bigamia", desc:"Contrair, sendo casado, novo casamento. Pena: 2 a 6 anos de reclusão." },
  { id:"CP054", art:"Art. 242", titulo:"Parto Suposto", desc:"Dar parte de filho alheio como próprio, registrá-lo ou não registrar nascimento de filho próprio." },
  { id:"CP055", art:"Art. 243", titulo:"Sonegação de Estado de Filiação", desc:"Deixar em asilo de expostos ou outra instituição de assistência filho próprio ou alheio, ocultando-lhe a filiação." },
  { id:"CP056", art:"Art. 244", titulo:"Abandono Material", desc:"Deixar de prover à subsistência de cônjuge, filho menor de 18 anos ou inapto para trabalho, de ascendente inválido ou maior de 60 anos." },
  { id:"CP057", art:"Art. 246", titulo:"Abandono Intelectual", desc:"Deixar de prover à instrução primária de filho em idade escolar. Pena: 15 dias a 1 mês de detenção ou multa." },
  { id:"CP058", art:"Art. 248", titulo:"Induzimento a Fuga, Entrega Arbitrária ou Sonegação de Incapazes", desc:"Induzir menor de 18 anos ou interdito a fugir do lugar em que se acha por determinação de quem sobre ele exerce autoridade." },
  { id:"CP059", art:"Art. 250", titulo:"Incêndio", desc:"Causar incêndio, expondo a perigo a vida, a integridade física ou o patrimônio de outrem. Pena: 3 a 6 anos de reclusão e multa." },
  { id:"CP060", art:"Art. 251", titulo:"Explosão", desc:"Expor a perigo a vida, a integridade física ou o patrimônio de outrem, mediante explosão, arremesso ou simples colocação de engenho de dinamite." },
  { id:"CP061", art:"Art. 254", titulo:"Inundação", desc:"Causar inundação, expondo a perigo a vida, a integridade física ou o patrimônio de outrem. Pena: 3 a 6 anos de reclusão no grau máximo." },
  { id:"CP062", art:"Art. 258", titulo:"Formas Qualificadas de Crime de Perigo Comum", desc:"Se do crime de perigo comum resulta lesão corporal grave, a pena privativa de liberdade é aumentada de metade; se resulta morte, é aplicada em dobro." },
  { id:"CP063", art:"Art. 261", titulo:"Atentado contra Segurança de Transporte", desc:"Expor a perigo embarcação ou aeronave, própria ou alheia, ou praticar qualquer ato tendente a impedir ou dificultar navegação marítima, fluvial ou aérea." },
  { id:"CP064", art:"Art. 267", titulo:"Epidemia", desc:"Causar epidemia, mediante a propagação de germes patogênicos. Pena: 10 a 15 anos de reclusão." },
  { id:"CP065", art:"Art. 268", titulo:"Infração de Medida Sanitária Preventiva", desc:"Infringir determinação do poder público destinada a impedir introdução ou propagação de doença contagiosa." },
  { id:"CP066", art:"Art. 269", titulo:"Omissão de Notificação de Doença", desc:"Deixar o médico de denunciar à autoridade pública doença cuja notificação é compulsória. Pena: 6 meses a 2 anos de detenção e multa." },
  { id:"CP067", art:"Art. 270", titulo:"Envenenamento de Água Potável", desc:"Envenenar água potável de uso comum ou particular ou substância alimentícia ou medicinal destinada a consumo. Pena: 10 a 15 anos de reclusão." },
  { id:"CP068", art:"Art. 273", titulo:"Falsificação, Corrupção ou Adulteração de Produto", desc:"Falsificar, corromper, adulterar ou alterar produto destinado a fins terapêuticos ou medicinais. Pena: 10 a 15 anos de reclusão e multa." },
  { id:"CP069", art:"Art. 277", titulo:"Substância Avariada", desc:"Vender ou expor à venda substância nas condições descritas nos artigos anteriores, que se destinam a fins terapêuticos ou medicinais." },
  { id:"CP070", art:"Art. 281", titulo:"Substância Entorpecente", desc:"Importar, exportar, remeter ou fabricar substância entorpecente sem autorização, ou em desacordo com determinação legal ou regulamentar." },
  { id:"CP071", art:"Art. 283", titulo:"Exercício Ilegal da Medicina", desc:"Exercer, ainda que a título gratuito, a profissão de médico, dentista ou farmacêutico sem autorização legal. Pena: 6 meses a 2 anos de detenção." },
  { id:"CP072", art:"Art. 286", titulo:"Instigação ao Crime", desc:"Instigar ou induzir alguém à prática de infração penal. Pena: até 6 meses de detenção ou multa." },
  { id:"CP073", art:"Art. 288", titulo:"Associação Criminosa", desc:"Associarem-se 3 ou mais pessoas para o fim específico de cometer crimes. Pena: 1 a 3 anos de reclusão." },
  { id:"CP074", art:"Art. 289", titulo:"Moeda Falsa", desc:"Falsificar, fabricando ou alterando, moeda metálica ou papel-moeda de curso legal no país ou no estrangeiro. Pena: 3 a 12 anos de reclusão e multa." },
  { id:"CP075", art:"Art. 291", titulo:"Petrechos para Falsificação de Moeda", desc:"Fabricar, adquirir, fornecer, a título oneroso ou gratuito, maquinismo, aparelho, instrumento ou qualquer objeto especialmente destinado à falsificação de moeda." },
  { id:"CP076", art:"Art. 293", titulo:"Falsificação de Papéis Públicos", desc:"Falsificar, fabricando ou alterando, selo destinado a controle tributário, papel selado ou qualquer papel de emissão legal destinado a arrecadação de tributo." },
  { id:"CP077", art:"Art. 296", titulo:"Falsificação de Selo ou Sinal Público", desc:"Falsificar, fabricando ou alterando, selo público destinado a autenticar atos oficiais da União, dos Estados ou dos Municípios." },
  { id:"CP078", art:"Art. 297", titulo:"Falsificação de Documento Público", desc:"Falsificar, no todo ou em parte, documento público, ou alterar documento público verdadeiro. Pena: 2 a 6 anos de reclusão e multa." },
  { id:"CP079", art:"Art. 298", titulo:"Falsificação de Documento Particular", desc:"Falsificar, no todo ou em parte, documento particular ou alterar documento particular verdadeiro. Pena: 1 a 5 anos de reclusão e multa." },
  { id:"CP080", art:"Art. 299", titulo:"Falsidade Ideológica", desc:"Omitir, em documento público ou particular, declaração que dele devia constar, ou inserir declaração falsa ou diversa da que devia ser escrita. Pena: 1 a 5 anos de reclusão e multa." },
  { id:"CP081", art:"Art. 301", titulo:"Certidão ou Atestado Ideologicamente Falso", desc:"Atestar ou certificar falsamente, em razão de função pública, fato ou circunstância que habilite alguém a obter cargo público, isenção de ônus, serviço militar ou similar." },
  { id:"CP082", art:"Art. 304", titulo:"Uso de Documento Falso", desc:"Fazer uso de qualquer dos papéis falsificados ou alterados descritos nos artigos anteriores." },
  { id:"CP083", art:"Art. 305", titulo:"Supressão de Documento", desc:"Destruir, suprimir ou ocultar, em benefício próprio ou de outrem, ou em prejuízo alheio, documento público ou particular verdadeiro de que não podia dispor." },
  { id:"CP084", art:"Art. 307", titulo:"Falsa Identidade", desc:"Atribuir-se ou atribuir a terceiro falsa identidade para obter vantagem, em proveito próprio ou alheio, ou para causar dano a outrem." },
  { id:"CP085", art:"Art. 309", titulo:"Uso de Nome Suposto", desc:"Usar, no exercício de atividade de qualquer natureza, nome ou firma que não se possui. Pena: detenção de 3 meses a 1 ano ou multa." },
  { id:"CP086", art:"Art. 311", titulo:"Adulteração de Sinal Identificador de Veículo", desc:"Adulterar ou remarcar o número de chassi ou qualquer sinal identificador de veículo automotor. Pena: 3 a 6 anos de reclusão e multa." },
  { id:"CP087", art:"Art. 312", titulo:"Peculato", desc:"Apropriar-se o funcionário público de dinheiro, valor ou qualquer outro bem público de que tem a posse em razão do cargo. Pena: 2 a 12 anos de reclusão e multa." },
  { id:"CP088", art:"Art. 313", titulo:"Peculato Culposo", desc:"Concorrer culposamente para o crime de outrem. Se o funcionário concorre culposamente para o crime de outrem. Pena: 3 meses a 1 ano de detenção." },
  { id:"CP089", art:"Art. 313-A", titulo:"Inserção de Dados Falsos em Sistema", desc:"Inserir ou facilitar a inserção de dados falsos, alterar ou excluir indevidamente dados corretos nos sistemas informatizados da Administração Pública com fim de obter vantagem." },
  { id:"CP090", art:"Art. 314", titulo:"Extravio, Sonegação ou Inutilização de Livro ou Documento", desc:"Extraviar livro oficial ou qualquer documento de que tem a guarda em razão do cargo. Pena: 1 a 4 anos de reclusão." },
  { id:"CP091", art:"Art. 315", titulo:"Emprego Irregular de Verbas ou Rendas Públicas", desc:"Dar às verbas ou rendas públicas aplicação diversa da estabelecida em lei. Pena: 1 a 3 meses de detenção." },
  { id:"CP092", art:"Art. 316", titulo:"Concussão", desc:"Exigir, para si ou para outrem, direta ou indiretamente, vantagem indevida em razão do cargo. Pena: 2 a 12 anos de reclusão e multa." },
  { id:"CP093", art:"Art. 317", titulo:"Corrupção Passiva", desc:"Solicitar ou receber, para si ou para outrem, vantagem indevida em razão do cargo. Pena: 2 a 12 anos de reclusão e multa." },
  { id:"CP094", art:"Art. 318", titulo:"Facilitação de Contrabando", desc:"Facilitar, com infração de dever funcional, a prática de contrabando ou descaminho. Pena: 3 a 8 anos de reclusão e multa." },
  { id:"CP095", art:"Art. 319", titulo:"Prevaricação", desc:"Retardar ou deixar de praticar ato de ofício, ou praticá-lo contra disposição legal, para satisfazer interesse pessoal. Pena: 3 meses a 1 ano e multa." },
  { id:"CP096", art:"Art. 320", titulo:"Condescendência Criminosa", desc:"Deixar o funcionário, por indulgência, de responsabilizar subordinado que cometeu infração no exercício do cargo ou, quando lhe falte competência, não levar o fato ao conhecimento da autoridade." },
  { id:"CP097", art:"Art. 321", titulo:"Advocacia Administrativa", desc:"Patrocinar, direta ou indiretamente, interesse privado perante a administração pública, valendo-se da qualidade de funcionário. Pena: 1 a 3 meses de detenção ou multa." },
  { id:"CP098", art:"Art. 322", titulo:"Violência Arbitrária", desc:"Praticar violência, no exercício de função ou a pretexto de exercê-la. Pena: 6 meses a 3 anos de reclusão, além da pena correspondente à violência." },
  { id:"CP099", art:"Art. 323", titulo:"Abandono de Função", desc:"Abandonar cargo público, fora dos casos permitidos em lei. Pena: 15 dias a 1 mês de detenção ou multa." },
  { id:"CP100", art:"Art. 325", titulo:"Violação de Sigilo Funcional", desc:"Revelar fato de que tem ciência em razão do cargo e que deva permanecer em segredo, ou facilitar-lhe a revelação." },
  { id:"CP101", art:"Art. 326", titulo:"Violação do Sigilo de Proposta em Licitação", desc:"Devassar o sigilo de proposta apresentada em procedimento licitatório, ou proporcionar a terceiro o ensejo de devassá-lo." },
  { id:"CP102", art:"Art. 329", titulo:"Resistência", desc:"Opor-se à execução de ato legal mediante violência ou ameaça a funcionário competente. Pena: 2 meses a 2 anos de detenção ou multa." },
  { id:"CP103", art:"Art. 330", titulo:"Desobediência", desc:"Desobedecer a ordem legal de funcionário público. Pena: 15 dias a 6 meses de detenção e multa." },
  { id:"CP104", art:"Art. 331", titulo:"Desacato", desc:"Desacatar funcionário público no exercício da função ou em razão dela. Pena: 6 meses a 2 anos de detenção ou multa." },
  { id:"CP105", art:"Art. 332", titulo:"Tráfico de Influência", desc:"Solicitar, exigir, cobrar ou obter, para si ou para outrem, vantagem ou promessa de vantagem, a pretexto de influir em ato praticado por funcionário público. Pena: 2 a 5 anos de reclusão e multa." },
  { id:"CP106", art:"Art. 333", titulo:"Corrupção Ativa", desc:"Oferecer ou prometer vantagem indevida a funcionário público para determinar a prática, omissão ou retardo de ato de ofício. Pena: 2 a 12 anos de reclusão e multa." },
  { id:"CP107", art:"Art. 334", titulo:"Contrabando", desc:"Importar ou exportar mercadoria proibida. Pena: 2 a 5 anos de reclusão." },
  { id:"CP108", art:"Art. 334-A", titulo:"Contrabando Qualificado", desc:"Importar ou exportar mercadoria proibida quando se trata de medicamentos, agrotóxicos, peças de veículos ou armas. Pena: 3 a 8 anos de reclusão." },
  { id:"CP109", art:"Art. 335", titulo:"Usurpação de Função Pública", desc:"Usurpar o exercício de função pública. Pena: 3 a 15 dias de detenção e multa, além da pena de violência." },
  { id:"CP110", art:"Art. 336", titulo:"Resistência ao Serviço Militar", desc:"Recusar às Forças Armadas ou à Polícia Militar auxílio que validamente requisitar. Pena: 15 dias a 6 meses de detenção." },
  { id:"CP111", art:"Art. 337-A", titulo:"Sonegação de Contribuição Previdenciária", desc:"Suprimir ou reduzir contribuição social previdenciária e qualquer acessório, mediante omissão de informações. Pena: 2 a 5 anos de reclusão e multa." },
  { id:"CP112", art:"Art. 339", titulo:"Denunciação Caluniosa", desc:"Dar causa à instauração de investigação policial ou processo judicial imputando a alguém crime de que o sabe inocente. Pena: 2 a 8 anos de reclusão e multa." },
  { id:"CP113", art:"Art. 340", titulo:"Comunicação Falsa de Crime", desc:"Provocar a ação de autoridade, comunicando-lhe a ocorrência de crime que sabe não ter verificado." },
  { id:"CP114", art:"Art. 341", titulo:"Auto-acusação Falsa", desc:"Acusar-se, perante a autoridade, de crime inexistente ou praticado por outrem. Pena: 3 meses a 2 anos de detenção ou multa." },
  { id:"CP115", art:"Art. 342", titulo:"Falso Testemunho", desc:"Fazer afirmação falsa, ou negar ou calar a verdade como testemunha em processo judicial. Pena: 2 a 4 anos de reclusão e multa." },
  { id:"CP116", art:"Art. 344", titulo:"Coação no Curso do Processo", desc:"Usar de violência ou grave ameaça, com o fim de favorecer interesse próprio ou alheio, contra autoridade, parte ou qualquer outra pessoa que funciona ou é chamada a intervir em processo." },
  { id:"CP117", art:"Art. 345", titulo:"Exercício Arbitrário das Próprias Razões", desc:"Fazer justiça pelas próprias mãos, para satisfazer pretensão legítima. Pena: 15 dias a 1 mês de detenção ou multa." },
  { id:"CP118", art:"Art. 347", titulo:"Fraude Processual", desc:"Inovar artificiosamente, na pendência de processo civil ou administrativo, o estado de lugar, de coisa ou de pessoa, com o fim de induzir a erro o juiz ou o perito." },
  { id:"CP119", art:"Art. 348", titulo:"Favorecimento Pessoal", desc:"Auxiliar a subtrair-se à ação de autoridade pública autor de crime a que é cominada pena de reclusão. Pena: 1 a 6 meses de detenção e multa." },
  { id:"CP120", art:"Art. 349", titulo:"Favorecimento Real", desc:"Prestar a criminoso, fora dos casos de co-autoria ou receptação, auxílio destinado a tornar seguro o proveito do crime. Pena: 1 a 6 meses de detenção e multa." },
  { id:"CP121", art:"Art. 350", titulo:"Exercício de Atividade com Infração de Decisão Administrativa", desc:"Infringir, na função de diretor, gerente ou administrador de sociedade anônima, disposição de lei ou ato do Poder Executivo que proíbe exercício de atividade." },
  { id:"CP122", art:"Art. 351", titulo:"Fuga de Pessoa Presa", desc:"Promover ou facilitar a fuga de pessoa legalmente presa ou submetida a medida de segurança detentiva. Pena: 6 meses a 2 anos de detenção." },
  { id:"CP123", art:"Art. 353", titulo:"Arrebatamento de Preso", desc:"Arrebatar preso, a fim de maltratá-lo, do poder de quem o tenha sob custódia ou guarda. Pena: reclusão de 1 a 4 anos, além da pena correspondente à violência." },
  { id:"CP124", art:"Art. 354", titulo:"Motim de Presos", desc:"Amotinarem-se presos, perturbando a ordem ou disciplina da prisão. Pena: detenção de 6 meses a 2 anos, além da pena correspondente à violência." },
  { id:"CP125", art:"Art. 356", titulo:"Patrocínio Infiel", desc:"Trair, na qualidade de advogado ou procurador, o dever profissional, prejudicando interesse, cujo patrocínio, em juízo ou fora dele, lhe é confiado." },
];

const CIVIL = [
  { id:"CC001", art:"Art. 1°", titulo:"Toda Pessoa tem Personalidade Civil", desc:"Toda pessoa é capaz de direitos e deveres na ordem civil. A personalidade civil da pessoa começa com o nascimento com vida." },
  { id:"CC002", art:"Art. 2°", titulo:"Proteção dos Direitos do Nascituro", desc:"A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro." },
  { id:"CC003", art:"Art. 3°", titulo:"Absolutamente Incapazes", desc:"São absolutamente incapazes de exercer pessoalmente os atos da vida civil os menores de 16 anos." },
  { id:"CC004", art:"Art. 4°", titulo:"Relativamente Incapazes", desc:"São incapazes, relativamente a certos atos ou à maneira de os exercer: os maiores de 16 e menores de 18 anos, os ébrios habituais e os viciados em tóxico." },
  { id:"CC005", art:"Art. 5°", titulo:"Maioridade Civil", desc:"A menoridade cessa aos dezoito anos completos, quando a pessoa fica habilitada à prática de todos os atos da vida civil." },
  { id:"CC006", art:"Art. 6°", titulo:"Extinção da Personalidade Natural", desc:"A existência da pessoa natural termina com a morte; presume-se esta, quanto aos ausentes, nos casos em que a lei autoriza a abertura de sucessão definitiva." },
  { id:"CC007", art:"Art. 7°", titulo:"Morte Presumida", desc:"Pode ser declarada a morte presumida sem decretação de ausência quando for extremamente provável a morte de quem estava em perigo de vida." },
  { id:"CC008", art:"Art. 9°", titulo:"Registro Público", desc:"Serão registrados em registro público o nascimento, os casamentos, os óbitos, a emancipação por outorga dos pais, a interdição e a sentença declaratória de ausência." },
  { id:"CC009", art:"Art. 11", titulo:"Direitos da Personalidade São Intransmissíveis", desc:"Com exceção dos casos previstos em lei, os direitos da personalidade são intransmissíveis e irrenunciáveis, não podendo o seu exercício sofrer limitação voluntária." },
  { id:"CC010", art:"Art. 12", titulo:"Lesão a Direito da Personalidade", desc:"Pode-se exigir que cesse a ameaça, ou a lesão, a direito da personalidade, e reclamar perdas e danos, sem prejuízo de outras sanções previstas em lei." },
  { id:"CC011", art:"Art. 13", titulo:"Atos de Disposição do Próprio Corpo", desc:"Salvo por exigência médica, é defeso o ato de disposição do próprio corpo, quando importar diminuição permanente da integridade física, ou contrariar os bons costumes." },
  { id:"CC012", art:"Art. 14", titulo:"Disposição Gratuita do Próprio Corpo", desc:"É válida, com objetivo científico, ou altruístico, a disposição gratuita do próprio corpo, no todo ou em parte, para depois da morte." },
  { id:"CC013", art:"Art. 15", titulo:"Tratamento Médico de Risco", desc:"Ninguém pode ser constrangido a submeter-se, com risco de vida, a tratamento médico ou a intervenção cirúrgica." },
  { id:"CC014", art:"Art. 16", titulo:"Direito ao Nome", desc:"Toda pessoa tem direito ao nome, nele compreendidos o prenome e o sobrenome." },
  { id:"CC015", art:"Art. 17", titulo:"Proteção do Nome", desc:"O nome da pessoa não pode ser empregado por outrem em publicações ou representações que a exponham ao desprezo público, ainda que não haja intenção difamatória." },
  { id:"CC016", art:"Art. 18", titulo:"Proteção do Nome para Fins Comerciais", desc:"Sem autorização, não se pode usar o nome alheio em propaganda comercial." },
  { id:"CC017", art:"Art. 20", titulo:"Divulgação de Escritos e Imagem", desc:"A divulgação de escritos, a transmissão da palavra, ou a publicação, a exposição ou a utilização da imagem de uma pessoa poderão ser proibidas, a seu requerimento, se lhe atingirem a honra." },
  { id:"CC018", art:"Art. 21", titulo:"Proteção da Vida Privada", desc:"A vida privada da pessoa natural é inviolável, e o juiz, a requerimento do interessado, adotará as providências necessárias para impedir ou fazer cessar ato contrário a esta norma." },
  { id:"CC019", art:"Art. 28", titulo:"Domicílio do Incapaz", desc:"O domicílio do incapaz é o do seu representante ou assistente; o do servidor público, o lugar em que exercer permanentemente suas funções." },
  { id:"CC020", art:"Art. 36", titulo:"Domicílio do Militar", desc:"O domicílio do militar em serviço ativo é o lugar onde servir; o domicílio do preso é o lugar onde ele se acha." },
  { id:"CC021", art:"Art. 40", titulo:"Pessoas Jurídicas de Direito Público", desc:"São pessoas jurídicas de direito público interno a União, os Estados, o Distrito Federal, os Territórios, os Municípios, as autarquias e as demais entidades de caráter público criadas por lei." },
  { id:"CC022", art:"Art. 44", titulo:"Pessoas Jurídicas de Direito Privado", desc:"São pessoas jurídicas de direito privado as associações, as sociedades, as fundações, as organizações religiosas, os partidos políticos e as empresas individuais de responsabilidade limitada." },
  { id:"CC023", art:"Art. 45", titulo:"Início da Pessoa Jurídica", desc:"Começa a existência legal das pessoas jurídicas de direito privado com a inscrição do ato constitutivo no respectivo registro." },
  { id:"CC024", art:"Art. 50", titulo:"Desconsideração da Personalidade Jurídica", desc:"Em caso de abuso da personalidade jurídica, caracterizado pelo desvio de finalidade ou pela confusão patrimonial, pode o juiz decidir que os efeitos de certas relações de obrigações sejam estendidos aos bens particulares dos administradores ou sócios." },
  { id:"CC025", art:"Art. 52", titulo:"Proteção da Pessoa Jurídica", desc:"Aplica-se às pessoas jurídicas, no que couber, a proteção dos direitos da personalidade." },
  { id:"CC026", art:"Art. 66", titulo:"Fundações", desc:"Velará pelas fundações o Ministério Público do Estado onde situadas; ou, se houverem de operar em mais de um Estado, em cada um deles o Ministério Público local." },
  { id:"CC027", art:"Art. 70", titulo:"Conceito de Domicílio", desc:"O domicílio da pessoa natural é o lugar onde ela estabelece a sua residência com ânimo definitivo." },
  { id:"CC028", art:"Art. 78", titulo:"Domicílio da Pessoa Jurídica", desc:"Nos contratos escritos, poderão os contratantes especificar domicílio onde se exercitem e cumpram os direitos e obrigações deles resultantes." },
  { id:"CC029", art:"Art. 81", titulo:"Bens Imóveis por Natureza", desc:"São bens imóveis o solo e tudo quanto se lhe incorporar natural ou artificialmente." },
  { id:"CC030", art:"Art. 83", titulo:"Bens Imóveis por Determinação Legal", desc:"Consideram-se imóveis para os efeitos legais os direitos reais sobre imóveis e as ações que os asseguram, o direito à sucessão aberta." },
  { id:"CC031", art:"Art. 84", titulo:"Bens Móveis", desc:"Os materiais destinados a alguma construção, enquanto não forem empregados, conservam sua qualidade de móveis; readquirem essa qualidade os provenientes da demolição de algum prédio." },
  { id:"CC032", art:"Art. 98", titulo:"Bens Públicos", desc:"São públicos os bens do domínio nacional pertencentes às pessoas jurídicas de direito público interno; todos os outros são particulares, seja qual for a pessoa a que pertencerem." },
  { id:"CC033", art:"Art. 99", titulo:"Classificação dos Bens Públicos", desc:"São bens públicos: os de uso comum do povo, como rios e mares; os de uso especial, como edifícios de repartição pública; e os dominicais." },
  { id:"CC034", art:"Art. 100", titulo:"Inalienabilidade dos Bens Públicos de Uso Comum", desc:"Os bens públicos de uso comum do povo e os de uso especial são inalienáveis, enquanto conservarem a sua qualificação, na forma que a lei determinar." },
  { id:"CC035", art:"Art. 104", titulo:"Requisitos do Negócio Jurídico", desc:"A validade do negócio jurídico requer: agente capaz, objeto lícito, possível, determinado ou determinável; e forma prescrita ou não defesa em lei." },
  { id:"CC036", art:"Art. 107", titulo:"Liberdade de Forma", desc:"A validade da declaração de vontade não dependerá de forma especial, senão quando a lei expressamente a exigir." },
  { id:"CC037", art:"Art. 112", titulo:"Intenção das Partes", desc:"Nas declarações de vontade se atenderá mais à intenção nelas consubstanciada do que ao sentido literal da linguagem." },
  { id:"CC038", art:"Art. 113", titulo:"Boa-fé nos Negócios Jurídicos", desc:"Os negócios jurídicos devem ser interpretados conforme a boa-fé e os usos do lugar de sua celebração." },
  { id:"CC039", art:"Art. 138", titulo:"Erro Substancial", desc:"São anuláveis os negócios jurídicos, quando as declarações de vontade emanarem de erro substancial que poderia ser percebido por pessoa de diligência normal." },
  { id:"CC040", art:"Art. 145", titulo:"Dolo como Causa do Negócio Jurídico", desc:"São os negócios jurídicos anuláveis por dolo, quando este for a sua causa." },
  { id:"CC041", art:"Art. 151", titulo:"Coação", desc:"A coação, para viciar a declaração de vontade, há de ser tal que incuta ao paciente fundado temor de dano iminente e considerável à sua pessoa, à sua família, ou aos seus bens." },
  { id:"CC042", art:"Art. 157", titulo:"Lesão nos Negócios Jurídicos", desc:"Ocorre a lesão quando uma pessoa, sob premente necessidade, ou por inexperiência, se obriga a prestação manifestamente desproporcional ao valor da prestação oposta." },
  { id:"CC043", art:"Art. 158", titulo:"Estado de Perigo", desc:"Configura-se o estado de perigo quando alguém, premido da necessidade de salvar-se, ou a pessoa de sua família, de grave dano conhecido pela outra parte, assume obrigação excessivamente onerosa." },
  { id:"CC044", art:"Art. 166", titulo:"Nulidade do Negócio Jurídico", desc:"É nulo o negócio jurídico quando for celebrado por pessoa absolutamente incapaz, for ilícito, impossível ou indeterminável o seu objeto, ou o motivo determinante, comum a ambas as partes, for ilícito." },
  { id:"CC045", art:"Art. 171", titulo:"Anulabilidade do Negócio Jurídico", desc:"Além dos casos expressamente declarados na lei, é anulável o negócio jurídico por incapacidade relativa do agente ou por vício resultante de erro, dolo, coação, lesão ou fraude contra credores." },
  { id:"CC046", art:"Art. 186", titulo:"Ato Ilícito", desc:"Aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito." },
  { id:"CC047", art:"Art. 187", titulo:"Abuso de Direito", desc:"Também comete ato ilícito o titular de um direito que, ao exercê-lo, excede manifestamente os limites impostos pelo seu fim econômico ou social, pela boa-fé ou pelos bons costumes." },
  { id:"CC048", art:"Art. 188", titulo:"Excludentes de Ilicitude", desc:"Não constituem atos ilícitos os praticados em legítima defesa ou no exercício regular de um direito reconhecido, e a deterioração ou destruição da coisa alheia para remover perigo iminente." },
  { id:"CC049", art:"Art. 189", titulo:"Violação do Direito", desc:"Violado o direito, nasce para o titular a pretensão, a qual se extingue pela prescrição, nos prazos a que aludem os arts. 205 e 206." },
  { id:"CC050", art:"Art. 202", titulo:"Causas de Interrupção da Prescrição", desc:"A prescrição se interrompe pelo despacho do juiz, mesmo incompetente, que ordenar a citação, se o interessado a promover no prazo e na forma da lei processual." },
  { id:"CC051", art:"Art. 205", titulo:"Prazo Geral de Prescrição", desc:"A prescrição ocorre em dez anos, quando a lei não lhe haja fixado prazo menor." },
  { id:"CC052", art:"Art. 206", titulo:"Prazos Especiais de Prescrição", desc:"Prescreve em 1 ano a pretensão dos hospedeiros ou fornecedores de víveres; em 2 anos a pretensão para haver prestações alimentares; em 3 anos a pretensão relativa a aluguéis." },
  { id:"CC053", art:"Art. 215", titulo:"Escritura Pública", desc:"A escritura pública, lavrada em notas de tabelião, é documento dotado de fé pública, fazendo prova plena." },
  { id:"CC054", art:"Art. 225", titulo:"Reproduções Mecânicas como Prova", desc:"As reproduções fotográficas, cinematográficas, os registros fonográficos e, em geral, quaisquer outras reproduções mecânicas ou eletrônicas de fatos ou de coisas fazem prova plena destes." },
  { id:"CC055", art:"Art. 229", titulo:"Recusa de Depor", desc:"Ninguém pode ser obrigado a depor sobre fato a cujo respeito, por estado ou profissão, deva guardar segredo." },
  { id:"CC056", art:"Art. 233", titulo:"Obrigação de Dar Coisa Certa", desc:"A obrigação de dar coisa certa abrange os acessórios dela embora não mencionados, salvo se o contrário resultar do título ou das circunstâncias do caso." },
  { id:"CC057", art:"Art. 247", titulo:"Obrigação de Fazer", desc:"Incorre na obrigação de indenizar perdas e danos o devedor que recusar a prestação a ele só imposta, ou só por ele exequível." },
  { id:"CC058", art:"Art. 248", titulo:"Perecimento do Objeto", desc:"Se a prestação do fato tornar-se impossível sem culpa do devedor, resolver-se-á a obrigação; se por culpa dele, responderá por perdas e danos." },
  { id:"CC059", art:"Art. 265", titulo:"Solidariedade Não Presumida", desc:"A solidariedade não se presume; resulta da lei ou da vontade das partes." },
  { id:"CC060", art:"Art. 275", titulo:"Solidariedade Passiva", desc:"O credor tem direito a exigir e receber de um ou de alguns dos devedores, parcial ou totalmente, a dívida comum." },
  { id:"CC061", art:"Art. 304", titulo:"Pagamento por Terceiro", desc:"Qualquer interessado na extinção da dívida pode pagá-la, usando, se o credor se opuser, dos meios conducentes à exoneração do devedor." },
  { id:"CC062", art:"Art. 313", titulo:"Objeto do Pagamento", desc:"O credor não é obrigado a receber prestação diversa da que lhe é devida, ainda que mais valiosa." },
  { id:"CC063", art:"Art. 315", titulo:"Pagamento em Dinheiro", desc:"As dívidas em dinheiro deverão ser pagas no vencimento, em moeda corrente e pelo valor nominal, salvo o disposto nos artigos subsequentes, ressalvada a legislação especial." },
  { id:"CC064", art:"Art. 317", titulo:"Revisão por Onerosidade Excessiva", desc:"Quando, por motivos imprevisíveis, sobrevier desproporção manifesta entre o valor da prestação devida e o do momento de sua execução, poderá o juiz corrigi-lo." },
  { id:"CC065", art:"Art. 319", titulo:"Quitação", desc:"O devedor que paga tem direito a quitação regular, e pode reter o pagamento, enquanto não lhe seja dada." },
  { id:"CC066", art:"Art. 330", titulo:"Pagamento em Local Diverso", desc:"O pagamento reiteradamente feito em outro local faz presumir renúncia do credor relativamente ao previsto no contrato." },
  { id:"CC067", art:"Art. 334", titulo:"Consignação em Pagamento", desc:"Considera-se pagamento, e extingue a obrigação, o depósito judicial ou em estabelecimento bancário da coisa devida, nos casos e formas legais." },
  { id:"CC068", art:"Art. 346", titulo:"Sub-rogação Legal", desc:"A sub-rogação opera-se, de pleno direito, em favor de quem paga a dívida pela qual era ou podia ser obrigado, no todo ou em parte." },
  { id:"CC069", art:"Art. 360", titulo:"Novação", desc:"Dá-se a novação quando o devedor contrai com o credor nova dívida para extinguir e substituir a anterior, ou quando novo devedor sucede ao antigo." },
  { id:"CC070", art:"Art. 373", titulo:"Compensação", desc:"A diferença de causa nas dívidas não impede a compensação, exceto se proveniente de esbulho, furto ou roubo; se uma se originar de comodato, depósito ou alimentos; ou se uma for de coisa não suscetível de penhora." },
  { id:"CC071", art:"Art. 389", titulo:"Inadimplemento", desc:"Não cumprida a obrigação, responde o devedor por perdas e danos, mais juros e atualização monetária segundo índices oficiais regularmente estabelecidos, e honorários de advogado." },
  { id:"CC072", art:"Art. 392", titulo:"Responsabilidade nos Contratos", desc:"Nos contratos benéficos, responde por simples culpa o contratante, a quem o contrato aproveite, e por dolo aquele a quem não favoreça. Nos contratos onerosos, responde cada uma das partes por culpa." },
  { id:"CC073", art:"Art. 393", titulo:"Caso Fortuito e Força Maior", desc:"O devedor não responde pelos prejuízos resultantes de caso fortuito ou força maior, se expressamente não se houver por eles responsabilizado." },
  { id:"CC074", art:"Art. 395", titulo:"Mora do Devedor", desc:"Responde o devedor pelos prejuízos a que sua mora der causa, mais juros, atualização dos valores monetários segundo índices oficiais regularmente estabelecidos, e honorários de advogado." },
  { id:"CC075", art:"Art. 399", titulo:"Mora e Impossibilidade de Cumprimento", desc:"O devedor em mora responde pela impossibilidade da prestação, embora essa impossibilidade resulte de caso fortuito ou de força maior, se estes ocorrerem durante o atraso." },
  { id:"CC076", art:"Art. 402", titulo:"Perdas e Danos", desc:"Salvo as exceções expressamente previstas em lei, as perdas e danos devidas ao credor abrangem, além do que ele efetivamente perdeu, o que razoavelmente deixou de lucrar." },
  { id:"CC077", art:"Art. 403", titulo:"Nexo Causal nas Perdas e Danos", desc:"Ainda que a inexecução resulte de dolo do devedor, as perdas e danos só incluem os prejuízos efetivos e os lucros cessantes por efeito dela direto e imediato." },
  { id:"CC078", art:"Art. 404", titulo:"Juros Moratórios", desc:"As perdas e danos, nas obrigações de pagamento em dinheiro, serão pagas com atualização monetária segundo índices oficiais regularmente estabelecidos, abrangendo juros, custas e honorários de advogado." },
  { id:"CC079", art:"Art. 406", titulo:"Taxa de Juros Legais", desc:"Quando os juros moratórios não forem convencionados, ou o forem sem taxa estipulada, ou quando provierem de determinação da lei, serão fixados segundo a taxa que estiver em vigor para a mora do pagamento de impostos devidos à Fazenda Nacional." },
  { id:"CC080", art:"Art. 408", titulo:"Cláusula Penal", desc:"Incorre de pleno direito o devedor na cláusula penal, desde que, culposamente, deixe de cumprir a obrigação ou se constitua em mora." },
  { id:"CC081", art:"Art. 421", titulo:"Função Social do Contrato", desc:"A liberdade contratual será exercida nos limites da função social do contrato, observado o conteúdo mínimo determinado pelo legislador." },
  { id:"CC082", art:"Art. 422", titulo:"Boa-fé Objetiva", desc:"Os contratantes são obrigados a guardar, assim na conclusão do contrato, como em sua execução, os princípios de probidade e boa-fé." },
  { id:"CC083", art:"Art. 425", titulo:"Contratos Atípicos", desc:"É lícito às partes estipular contratos atípicos, observadas as normas gerais fixadas neste Código." },
  { id:"CC084", art:"Art. 426", titulo:"Herança de Pessoa Viva", desc:"Não pode ser objeto de contrato a herança de pessoa viva." },
  { id:"CC085", art:"Art. 427", titulo:"Oferta", desc:"A proposta de contrato obriga o proponente, se o contrário não resultar dos termos dela, da natureza do negócio, ou das circunstâncias do caso." },
  { id:"CC086", art:"Art. 439", titulo:"Promessa de Fato de Terceiro", desc:"Aquele que tiver prometido fato de terceiro responderá por perdas e danos, quando este o não executar." },
  { id:"CC087", art:"Art. 443", titulo:"Evicção", desc:"Se o adquirente tiver auferido vantagens das deteriorações, e não tiver sido condenado a indenizá-las, o valor das vantagens será deduzido da quantia que lhe houver de dar o alienante." },
  { id:"CC088", art:"Art. 450", titulo:"Evicção Parcial", desc:"Salvo estipulação em contrário, ficará sujeito às consequências da evicção o adquirente, se tiver conhecimento, ao celebrar o contrato, do perigo de evicção." },
  { id:"CC089", art:"Art. 457", titulo:"Vícios Redibitórios", desc:"O adquirente pode rejeitar a coisa vendida que apresente vício oculto ou reclamar abatimento proporcional do preço." },
  { id:"CC090", art:"Art. 478", titulo:"Resolução por Onerosidade Excessiva", desc:"Nos contratos de execução continuada ou diferida, se a prestação de uma das partes se tornar excessivamente onerosa, com extrema vantagem para a outra, em virtude de acontecimentos extraordinários e imprevisíveis, poderá o devedor pedir a resolução do contrato." },
  { id:"CC091", art:"Art. 481", titulo:"Compra e Venda", desc:"Pelo contrato de compra e venda, um dos contratantes se obriga a transferir o domínio de certa coisa, e o outro, a pagar-lhe certo preço em dinheiro." },
  { id:"CC092", art:"Art. 484", titulo:"Venda por Amostras", desc:"Se a venda se realizar à vista de amostras, protótipos ou modelos, entender-se-á que o vendedor assegura ter a coisa as qualidades que a elas correspondem." },
  { id:"CC093", art:"Art. 496", titulo:"Venda entre Ascendente e Descendente", desc:"É anulável a venda de ascendente a descendente, salvo se os outros descendentes e o cônjuge do alienante expressamente houverem consentido." },
  { id:"CC094", art:"Art. 533", titulo:"Troca ou Permuta", desc:"Aplicam-se à troca as disposições referentes à compra e venda, com as seguintes modificações." },
  { id:"CC095", art:"Art. 538", titulo:"Doação", desc:"Considera-se doação o contrato em que uma pessoa, por liberalidade, transfere do seu patrimônio bens ou vantagens para o de outra." },
  { id:"CC096", art:"Art. 548", titulo:"Doação Universal", desc:"É nula a doação de todos os bens sem reserva de parte, ou renda suficiente para a subsistência do doador." },
  { id:"CC097", art:"Art. 549", titulo:"Doação Inoficiosa", desc:"Nula é também a doação quanto à parte que exceder à de que o doador, no momento da liberalidade, poderia dispor em testamento." },
  { id:"CC098", art:"Art. 557", titulo:"Revogação da Doação por Ingratidão", desc:"Podem ser revogadas por ingratidão as doações se o donatário atentou contra a vida do doador, cometeu crime de homicídio doloso contra ele, ou o injuriou gravemente." },
  { id:"CC099", art:"Art. 565", titulo:"Locação", desc:"Na locação de coisas, uma das partes se obriga a ceder à outra, por tempo determinado ou não, o uso e gozo de coisa não fungível, mediante certa retribuição." },
  { id:"CC100", art:"Art. 569", titulo:"Obrigações do Locatário", desc:"O locatário é obrigado a servir-se da coisa alugada para os usos convencionados ou presumidos, a tratá-la com o mesmo cuidado como se sua fosse." },
  { id:"CC101", art:"Art. 579", titulo:"Comodato", desc:"O comodato é o empréstimo gratuito de coisas não fungíveis. Perfaz-se com a tradição do objeto." },
  { id:"CC102", art:"Art. 586", titulo:"Mútuo", desc:"O mútuo é o empréstimo de coisas fungíveis. O mutuário é obrigado a restituir ao mutuante o que dele recebeu em coisa do mesmo gênero, qualidade e quantidade." },
  { id:"CC103", art:"Art. 593", titulo:"Prestação de Serviços", desc:"A prestação de serviço, que não estiver sujeita às leis trabalhistas ou a lei especial, reger-se-á pelas disposições deste Capítulo." },
  { id:"CC104", art:"Art. 596", titulo:"Duração do Contrato de Serviços", desc:"Não se tendo estipulado, nem chegado a acordo as partes, fixar-se-á por arbitramento a retribuição, segundo o costume do lugar, o tempo de serviço e sua qualidade." },
  { id:"CC105", art:"Art. 610", titulo:"Empreitada", desc:"O empreiteiro de uma obra pode contribuir para ela só com seu trabalho ou com ele e os materiais." },
  { id:"CC106", art:"Art. 627", titulo:"Depósito", desc:"Pelo contrato de depósito recebe o depositário um objeto móvel, para guardar, até que o depositante o reclame." },
  { id:"CC107", art:"Art. 632", titulo:"Obrigação de Restituir", desc:"Se o depósito se fizer com o fim de ser utilizado pelo depositário, reger-se-á pelas normas do mútuo, se o depositante der ao depositário o poder de consumir a coisa depositada." },
  { id:"CC108", art:"Art. 646", titulo:"Mandato", desc:"O mandato é gratuito, exceto quando o contrário for estipulado, quando resultar das circunstâncias ou dos usos, ou quando o seu objeto corresponder ao dívidas que o mandatário exerce por profissão lucrativa." },
  { id:"CC109", art:"Art. 653", titulo:"Conceito de Mandato", desc:"Opera-se o mandato quando alguém recebe de outrem poderes para, em seu nome, praticar atos ou administrar interesses." },
  { id:"CC110", art:"Art. 657", titulo:"Outorga de Poderes Especiais", desc:"O mandato não obriga nos atos que exijam poderes especiais, e deles não constar. A outorga de poderes gerais só compreende os atos de administração." },
  { id:"CC111", art:"Art. 682", titulo:"Extinção do Mandato", desc:"Cessa o mandato pela revogação ou pela renúncia, pela morte ou interdição de uma das partes, pela mudança de estado que inabilite o mandante a conferir os poderes, ou o mandatário para os exercer." },
  { id:"CC112", art:"Art. 693", titulo:"Comissão Mercantil", desc:"O contrato de comissão tem por objeto a aquisição ou a venda de bens pelo comissário, em seu próprio nome, à conta do comitente." },
  { id:"CC113", art:"Art. 710", titulo:"Agência e Distribuição", desc:"Pelo contrato de agência, uma pessoa assume, em caráter não eventual e sem vínculos de dependência, a obrigação de promover negócios à conta de outra." },
  { id:"CC114", art:"Art. 720", titulo:"Indenização na Agência", desc:"Se o contrato for por tempo indeterminado, qualquer das partes poderá resolvê-lo, mediante aviso prévio de noventa dias, desde que transcorrido prazo compatível com a natureza e o vulto do investimento exigido do agente." },
  { id:"CC115", art:"Art. 733", titulo:"Transporte de Pessoas", desc:"Nos contratos de transporte, em geral, considerando-se estabelecido o preço do transporte para todo o percurso, o transportador não pode exigir remuneração mais elevada em razão de o destino ser mais distante do que o declarado." },
  { id:"CC116", art:"Art. 734", titulo:"Responsabilidade do Transportador", desc:"O transportador responde pelos danos causados às pessoas transportadas e suas bagagens, salvo motivo de força maior, sendo nula qualquer cláusula excludente da responsabilidade." },
  { id:"CC117", art:"Art. 747", titulo:"Transporte de Coisas", desc:"O transportador deverá recusar a coisa cuja embalagem seja inadequada, bem como a que possa por em risco a saúde das pessoas ou danificar o veículo e outros bens." },
  { id:"CC118", art:"Art. 757", titulo:"Seguro", desc:"Pelo contrato de seguro, o segurador se obriga, mediante o pagamento do prêmio, a garantir interesse legítimo do segurado, relativo a pessoa ou a coisa, contra riscos predeterminados." },
  { id:"CC119", art:"Art. 766", titulo:"Declaração Falsa no Seguro", desc:"Se o segurado, por si ou por seu representante, fizer declarações inexatas ou omitir circunstâncias que possam influir na aceitação da proposta ou na taxa do prêmio, perderá o direito à garantia." },
  { id:"CC120", art:"Art. 773", titulo:"Seguro de Vida", desc:"O segurador que, ao tempo do contrato, sabe estar passado o risco de que o segurado se pretende cobrir, e, não obstante, expede a apólice, pagará em dobro o prêmio estipulado." },
  { id:"CC121", art:"Art. 790", titulo:"Seguro de Pessoa", desc:"No seguro de pessoa, o capital segurado é livremente estipulado pelo proponente, que pode contratar mais de um seguro sobre o mesmo interesse, com o mesmo ou diferentes seguradores." },
  { id:"CC122", art:"Art. 818", titulo:"Fiança", desc:"Pelo contrato de fiança, uma pessoa garante satisfazer ao credor uma obrigação assumida pelo devedor, caso este não a cumpra." },
  { id:"CC123", art:"Art. 824", titulo:"Benefício de Ordem", desc:"As obrigações nulas não são suscetíveis de fiança, exceto se a nulidade resultar apenas de incapacidade pessoal do devedor." },
  { id:"CC124", art:"Art. 840", titulo:"Transação", desc:"É lícito aos interessados prevenirem ou terminarem o litígio mediante concessões mútuas." },
  { id:"CC125", art:"Art. 844", titulo:"Nulidade na Transação", desc:"A transação não aproveita, nem prejudica senão aos que nela intervierem, ainda que diga respeito a coisa indivisível." },
  { id:"CC126", art:"Art. 852", titulo:"Arbitragem", desc:"É vedado compromisso para solução de questões de estado e de direito pessoal de família." },
  { id:"CC127", art:"Art. 927", titulo:"Obrigação de Indenizar", desc:"Aquele que, por ato ilícito, causar dano a outrem, fica obrigado a repará-lo. Haverá obrigação de reparar o dano, independentemente de culpa, nos casos especificados em lei." },
  { id:"CC128", art:"Art. 928", titulo:"Responsabilidade do Incapaz", desc:"O incapaz responde pelos prejuízos que causar, se as pessoas por ele responsáveis não tiverem obrigação de fazê-lo ou não dispuserem de meios suficientes." },
  { id:"CC129", art:"Art. 932", titulo:"Responsabilidade por Ato de Terceiro", desc:"São também responsáveis pela reparação civil os pais pelos filhos menores que estiverem sob sua autoridade; o tutor e o curador pelos pupilos e curatelados; o empregador ou comitente por seus empregados." },
  { id:"CC130", art:"Art. 935", titulo:"Independência da Responsabilidade Civil", desc:"A responsabilidade civil é independente da criminal, não se podendo questionar mais sobre a existência do fato, ou sobre quem seja o seu autor, quando estas questões se acharem decididas no juízo criminal." },
  { id:"CC131", art:"Art. 942", titulo:"Solidariedade na Responsabilidade Civil", desc:"Os bens do responsável pela ofensa ou violação do direito de outrem ficam sujeitos à reparação do dano causado; e, se a ofensa tiver mais de um autor, todos responderão solidariamente pela reparação." },
  { id:"CC132", art:"Art. 944", titulo:"Extensão do Dano", desc:"A indenização mede-se pela extensão do dano. Se houver excessiva desproporção entre a gravidade da culpa e o dano, poderá o juiz reduzir, equitativamente, a indenização." },
  { id:"CC133", art:"Art. 945", titulo:"Culpa Concorrente", desc:"Se a vítima tiver concorrido culposamente para o evento danoso, a sua indenização será fixada tendo-se em conta a gravidade de sua culpa em confronto com a do autor do dano." },
  { id:"CC134", art:"Art. 947", titulo:"Prestação Natural ou Pecuniária", desc:"Se o devedor não puder cumprir a prestação na espécie ajustada, substituir-se-á pelo seu valor, em moeda corrente." },
  { id:"CC135", art:"Art. 948", titulo:"Indenização por Homicídio", desc:"No caso de homicídio, a indenização consiste, sem excluir outras reparações: no pagamento das despesas com o tratamento da vítima, seu funeral e o luto da família." },
  { id:"CC136", art:"Art. 949", titulo:"Indenização por Lesão", desc:"No caso de lesão ou outra ofensa à saúde, o ofensor indenizará o ofendido das despesas do tratamento e dos lucros cessantes até ao fim da convalescença, além de algum outro prejuízo que o ofendido prove haver sofrido." },
  { id:"CC137", art:"Art. 951", titulo:"Responsabilidade Médica", desc:"O disposto nos artigos anteriores se aplica ainda no caso de indenização devida por aquele que, no exercício de atividade profissional, por negligência, imprudência ou imperícia, causar a morte do paciente." },
  { id:"CC138", art:"Art. 953", titulo:"Indenização por Ofensa à Honra", desc:"A indenização por injúria, difamação ou calúnia consistirá na reparação do dano que delas resulte ao ofendido." },
  { id:"CC139", art:"Art. 966", titulo:"Empresário", desc:"Considera-se empresário quem exerce profissionalmente atividade econômica organizada para a produção ou a circulação de bens ou de serviços." },
  { id:"CC140", art:"Art. 967", titulo:"Registro do Empresário", desc:"É obrigatória a inscrição do empresário no Registro Público de Empresas Mercantis da respectiva sede, antes do início de sua atividade." },
  { id:"CC141", art:"Art. 977", titulo:"Sociedade entre Cônjuges", desc:"Faculta-se aos cônjuges contratar sociedade, entre si ou com terceiros, desde que não tenham casado no regime da comunhão universal de bens, ou no da separação obrigatória." },
  { id:"CC142", art:"Art. 981", titulo:"Contrato de Sociedade", desc:"Celebram contrato de sociedade as pessoas que reciprocamente se obrigam a contribuir, com bens ou serviços, para o exercício de atividade econômica e a partilha, entre si, dos resultados." },
  { id:"CC143", art:"Art. 997", titulo:"Contrato Social", desc:"A sociedade constitui-se mediante contrato escrito, particular ou público, que deve conter nome, qualificação e domicílio dos sócios; denominação, objeto, sede e prazo da sociedade." },
  { id:"CC144", art:"Art. 1.003", titulo:"Cessão de Quotas", desc:"A cessão total ou parcial de quota, sem a correspondente modificação do contrato social com o consentimento dos demais sócios, não terá eficácia quanto a estes e à sociedade." },
  { id:"CC145", art:"Art. 1.052", titulo:"Sociedade Limitada", desc:"Na sociedade limitada, a responsabilidade de cada sócio é restrita ao valor de suas quotas, mas todos respondem solidariamente pela integralização do capital social." },
  { id:"CC146", art:"Art. 1.088", titulo:"Sociedade Anônima", desc:"Na sociedade anônima, o capital divide-se em ações, obrigando-se cada sócio ou acionista somente pelo preço de emissão das ações que subscrever ou adquirir." },
  { id:"CC147", art:"Art. 1.096", titulo:"Aplicação do Código Civil às SA", desc:"No que a lei especial for omissa, aplicam-se às sociedades anônimas as disposições deste Capítulo." },
  { id:"CC148", art:"Art. 1.121", titulo:"Processo de Dissolução", desc:"Requerida a dissolução judicial, o juiz pode, antes de decretá-la, suspendê-la, quando verificar que a dissolução não convém aos interesses dos demais sócios." },
  { id:"CC149", art:"Art. 1.166", titulo:"Impenhorabilidade do Nome Empresarial", desc:"A inscrição do empresário, ou dos atos constitutivos das pessoas jurídicas, ou as respectivas averbações, no registro próprio, asseguram o uso exclusivo do nome nos limites do respectivo Estado." },
  { id:"CC150", art:"Art. 1.196", titulo:"Posse", desc:"Considera-se possuidor todo aquele que tem de fato o exercício, pleno ou não, de algum dos poderes inerentes à propriedade." },
  { id:"CC151", art:"Art. 1.197", titulo:"Composse e Posse Indireta", desc:"A posse direta, de pessoa que tem a coisa em seu poder, temporariamente, em virtude de direito pessoal, ou real, não anula a indireta, de quem aquela foi havida, podendo o possuidor direto defender a sua posse contra o indireto." },
  { id:"CC152", art:"Art. 1.200", titulo:"Posse Justa", desc:"É justa a posse que não for violenta, clandestina ou precária." },
  { id:"CC153", art:"Art. 1.201", titulo:"Posse de Boa-fé", desc:"É de boa-fé a posse, se o possuidor ignora o vício, ou o obstáculo que impede a aquisição da coisa." },
  { id:"CC154", art:"Art. 1.210", titulo:"Proteção Possessória", desc:"O possuidor tem direito a ser mantido na posse em caso de turbação, restituído no de esbulho, e segurado de violência iminente, se tiver justo receio de ser molestado." },
  { id:"CC155", art:"Art. 1.214", titulo:"Percepção de Frutos pelo Possuidor", desc:"O possuidor de boa-fé tem direito, enquanto ela durar, aos frutos percebidos." },
  { id:"CC156", art:"Art. 1.225", titulo:"Direitos Reais", desc:"São direitos reais: a propriedade, a superfície, as servidões, o usufruto, o uso, a habitação, o direito do promitente comprador do imóvel, o penhor, a hipoteca, a anticrese e a concessão de uso especial para fins de moradia." },
  { id:"CC157", art:"Art. 1.228", titulo:"Propriedade", desc:"O proprietário tem a faculdade de usar, gozar e dispor da coisa, e o direito de reavê-la do poder de quem quer que injustamente a possua ou detenha." },
  { id:"CC158", art:"Art. 1.238", titulo:"Usucapião Extraordinária", desc:"Aquele que, por quinze anos, sem interrupção, nem oposição, possuir como seu um imóvel, adquire-lhe a propriedade, independentemente de título e boa-fé." },
  { id:"CC159", art:"Art. 1.239", titulo:"Usucapião Especial Rural", desc:"Aquele que, não sendo proprietário de imóvel rural ou urbano, possua como sua, por cinco anos ininterruptos, sem oposição, área de terra em zona rural não superior a cinquenta hectares, tornando-a produtiva com seu trabalho, adquirir-lhe-á a propriedade." },
  { id:"CC160", art:"Art. 1.240", titulo:"Usucapião Especial Urbana", desc:"Aquele que possuir, como sua, área ou edificação urbana de até duzentos e cinquenta metros quadrados, por cinco anos ininterruptamente e sem oposição, utilizando-a para sua moradia ou de sua família, adquirir-lhe-á o domínio." },
  { id:"CC161", art:"Art. 1.245", titulo:"Transferência do Imóvel", desc:"Transfere-se entre vivos a propriedade mediante o registro do título translativo no Registro de Imóveis." },
  { id:"CC162", art:"Art. 1.258", titulo:"Construção em Solo Alheio (Acessão)", desc:"Se a construção, feita parcialmente em solo próprio, invade solo alheio em proporção não superior à vigésima parte deste, adquire o construtor de boa-fé a propriedade da parte do solo invadido." },
  { id:"CC163", art:"Art. 1.275", titulo:"Perda da Propriedade", desc:"Perde-se a propriedade: por alienação, pela renúncia, pelo abandono, pelo perecimento da coisa e por desapropriação." },
  { id:"CC164", art:"Art. 1.277", titulo:"Direito de Vizinhança", desc:"O proprietário ou o possuidor de um prédio tem o direito de fazer cessar as interferências prejudiciais à segurança, ao sossego e à saúde dos que o habitam, provocadas pela utilização de propriedade vizinha." },
  { id:"CC165", art:"Art. 1.285", titulo:"Passagem Forçada", desc:"O dono do prédio que não tiver acesso a via pública, nascente ou porto, pode, mediante pagamento de indenização cabal, constranger o vizinho a lhe dar passagem, cujo rumo será judicialmente fixado, se necessário." },
  { id:"CC166", art:"Art. 1.296", titulo:"Passagem de Cabos e Tubulações", desc:"O proprietário é obrigado a tolerar a passagem, através de seu imóvel, de cabos, tubulações e outros condutos subterrâneos de serviços de utilidade pública, em proveito de proprietários vizinhos." },
  { id:"CC167", art:"Art. 1.314", titulo:"Condomínio Voluntário", desc:"Cada condômino pode usar da coisa conforme sua destinação, sobre ela exercer todos os direitos compatíveis com a indivisão, reivindicá-la de terceiro, defender a sua posse e alhear a respectiva parte ideal, ou gravá-la." },
  { id:"CC168", art:"Art. 1.331", titulo:"Condomínio Edilício", desc:"Pode haver, em edificações, partes que são propriedade exclusiva, e partes que são propriedade comum dos condôminos." },
  { id:"CC169", art:"Art. 1.369", titulo:"Direito de Superfície", desc:"O proprietário pode conceder a outrem o direito de construir ou de plantar em seu terreno, por tempo determinado, mediante escritura pública devidamente registrada no Cartório de Registro de Imóveis." },
  { id:"CC170", art:"Art. 1.390", titulo:"Usufruto", desc:"O usufruto pode recair em um ou mais bens, móveis ou imóveis, em um patrimônio inteiro, ou parte deste, abrangendo-lhe, no todo ou em parte, os frutos e utilidades." },
  { id:"CC171", art:"Art. 1.412", titulo:"Uso", desc:"O usuário usará da coisa e perceberá os seus frutos, quanto o exigirem as necessidades suas e de sua família." },
  { id:"CC172", art:"Art. 1.414", titulo:"Habitação", desc:"Quando o direito real de habitação recai em prédio destinado a moradia, pode o seu titular habitar pessoalmente, com a família." },
  { id:"CC173", art:"Art. 1.417", titulo:"Promessa de Compra e Venda", desc:"Mediante promessa de compra e venda, em que se não pactuou arrependimento, celebrada por instrumento público ou particular, e registrada no Cartório de Registro de Imóveis, adquire o promitente comprador direito real à aquisição do imóvel." },
  { id:"CC174", art:"Art. 1.419", titulo:"Garantias Reais", desc:"Nas dívidas garantidas por penhor, anticrese ou hipoteca, o bem dado em garantia fica sujeito, por vínculo real, ao cumprimento da obrigação." },
  { id:"CC175", art:"Art. 1.420", titulo:"Alienação da Garantia Real", desc:"Só aquele que pode alienar poderá empenhar, hipotecar ou dar em anticrese; só os bens que se podem alienar poderão ser dados em penhor, anticrese ou hipoteca." },
  { id:"CC176", art:"Art. 1.442", titulo:"Penhor Rural", desc:"Podem ser objeto de penhor os imóveis rurais produtivos, fixos e permanentes, as máquinas e instrumentos agrícolas, as colheitas pendentes ou em via de formação." },
  { id:"CC177", art:"Art. 1.458", titulo:"Penhor de Direitos e Títulos de Crédito", desc:"Pode ser objeto de penhor o direito, bem como o título de crédito." },
  { id:"CC178", art:"Art. 1.473", titulo:"Bens que podem ser Hipotecados", desc:"Podem ser objeto de hipoteca: os imóveis e os acessórios dos imóveis conjuntamente com eles; o domínio direto; o domínio útil; as estradas de ferro." },
  { id:"CC179", art:"Art. 1.485", titulo:"Prorrogação da Hipoteca", desc:"Mediante simples averbação, requerida por ambas as partes, poderá prorrogar-se a hipoteca, até 30 anos da data do contrato. Desde que perfaça esse prazo, só poderá subsistir o contrato de hipoteca reconstituindo-o por novo título e novo registro." },
  { id:"CC180", art:"Art. 1.511", titulo:"Casamento", desc:"O casamento estabelece comunhão plena de vida, com base na igualdade de direitos e deveres dos cônjuges." },
  { id:"CC181", art:"Art. 1.512", titulo:"Gratuidade do Casamento Civil", desc:"O casamento é civil e gratuita a sua celebração. O casamento religioso, que atender às exigências da lei para a validade do casamento civil, equipara-se a este." },
  { id:"CC182", art:"Art. 1.514", titulo:"Constituição do Casamento", desc:"O casamento se realiza no momento em que o homem e a mulher manifestam, perante o juiz, a sua vontade de estabelecer vínculo conjugal, e o juiz os declara casados." },
  { id:"CC183", art:"Art. 1.517", titulo:"Capacidade para Casar", desc:"O homem e a mulher com dezesseis anos podem casar, exigindo-se autorização de ambos os pais, ou de seus representantes legais, enquanto não atingida a maioridade civil." },
  { id:"CC184", art:"Art. 1.521", titulo:"Impedimentos ao Casamento", desc:"Não podem casar os ascendentes com os descendentes, os afins em linha reta, o adotante com quem foi cônjuge do adotado, os irmãos." },
  { id:"CC185", art:"Art. 1.527", titulo:"Proclamas do Casamento", desc:"Estando em ordem a documentação, o oficial extrairá o edital, que se afixará durante quinze dias nas circunscrições do Registro Civil de ambos os nubentes." },
  { id:"CC186", art:"Art. 1.548", titulo:"Nulidade do Casamento", desc:"É nulo o casamento contraído pelo enfermo mental sem o necessário discernimento para os atos da vida civil e pelo menor de dezesseis anos." },
  { id:"CC187", art:"Art. 1.556", titulo:"Anulação do Casamento por Erro", desc:"O casamento pode ser anulado por vício da vontade, se houve por parte de um dos nubentes, ao consentir, erro essencial quanto à pessoa do outro." },
  { id:"CC188", art:"Art. 1.566", titulo:"Deveres dos Cônjuges", desc:"São deveres de ambos os cônjuges: fidelidade recíproca, vida em comum, no domicílio conjugal, mútua assistência, sustento, guarda e educação dos filhos, respeito e consideração mútuos." },
  { id:"CC189", art:"Art. 1.571", titulo:"Dissolução da Sociedade Conjugal", desc:"A sociedade conjugal termina pela morte de um dos cônjuges; pela nulidade ou anulação do casamento; pela separação judicial; pelo divórcio." },
  { id:"CC190", art:"Art. 1.580", titulo:"Divórcio", desc:"Decorrido um ano do trânsito em julgado da sentença que houver decretado a separação judicial, ou da decisão concessiva da medida cautelar de separação de corpos, qualquer das partes poderá requerer sua conversão em divórcio." },
  { id:"CC191", art:"Art. 1.583", titulo:"Guarda dos Filhos", desc:"A guarda será unilateral ou compartilhada. A guarda compartilhada corresponde à responsabilização conjunta e ao exercício de direitos e deveres do pai e da mãe que não vivam sob o mesmo teto, concernentes ao poder familiar dos filhos comuns." },
  { id:"CC192", art:"Art. 1.589", titulo:"Direito de Visita", desc:"O pai ou a mãe, em cuja guarda não estejam os filhos, poderá visitá-los e tê-los em sua companhia, segundo o que acordar com o outro cônjuge." },
  { id:"CC193", art:"Art. 1.591", titulo:"Relações de Parentesco", desc:"São parentes em linha reta as pessoas que estão umas para com as outras na relação de ascendentes e descendentes." },
  { id:"CC194", art:"Art. 1.593", titulo:"Parentesco Natural e Civil", desc:"O parentesco é natural ou civil, conforme resulte de consanguinidade ou outra origem." },
  { id:"CC195", art:"Art. 1.596", titulo:"Igualdade dos Filhos", desc:"Os filhos, havidos ou não da relação de casamento, ou por adoção, terão os mesmos direitos e qualificações, proibidas quaisquer designações discriminatórias relativas à filiação." },
  { id:"CC196", art:"Art. 1.601", titulo:"Impugnação de Paternidade", desc:"Cabe ao marido o direito de contestar a paternidade dos filhos nascidos de sua mulher, sendo tal ação imprescritível." },
  { id:"CC197", art:"Art. 1.606", titulo:"Ação de Prova de Filiação", desc:"A ação de prova de filiação compete ao filho, enquanto viver, passando aos herdeiros, se ele morrer menor ou incapaz." },
  { id:"CC198", art:"Art. 1.611", titulo:"Filiação por Adoção", desc:"A adoção atribui a condição de filho ao adotado, com os mesmos direitos e deveres, desligando-o de qualquer vínculo com os pais e parentes consanguíneos, salvo os impedimentos matrimoniais." },
  { id:"CC199", art:"Art. 1.634", titulo:"Poder Familiar", desc:"Compete a ambos os pais, qualquer que seja a sua situação conjugal, o pleno exercício do poder familiar, que consiste em, quanto aos filhos: dirigir a criação e a educação, exercer a guarda." },
  { id:"CC200", art:"Art. 1.635", titulo:"Extinção do Poder Familiar", desc:"Extingue-se o poder familiar pela morte dos pais ou do filho, pela emancipação, pela maioridade, pela adoção e por decisão judicial." },
  { id:"CC201", art:"Art. 1.641", titulo:"Separação Obrigatória de Bens", desc:"É obrigatório o regime da separação de bens no casamento das pessoas que o contraírem com inobservância das causas suspensivas da celebração do casamento; da pessoa maior de 70 anos." },
  { id:"CC202", art:"Art. 1.647", titulo:"Outorga Conjugal", desc:"Ressalvado o disposto no art. 1.648, nenhum dos cônjuges pode, sem autorização do outro, exceto no regime da separação absoluta: alienar ou gravar de ônus real os bens imóveis." },
  { id:"CC203", art:"Art. 1.658", titulo:"Comunhão Parcial de Bens", desc:"No regime de comunhão parcial, comunicam-se os bens que sobrevierem ao casal, na constância do casamento, com as exceções dos artigos seguintes." },
  { id:"CC204", art:"Art. 1.672", titulo:"Participação Final nos Aquestos", desc:"No regime de participação final nos aquestos, cada cônjuge possui patrimônio próprio e lhe cabe, à época da dissolução da sociedade conjugal, direito à metade dos bens adquiridos pelo casal, a título oneroso, na constância do casamento." },
  { id:"CC205", art:"Art. 1.694", titulo:"Alimentos", desc:"Podem os parentes, os cônjuges ou companheiros pedir uns aos outros os alimentos de que necessitem para viver de modo compatível com a sua condição social, inclusive para atender às necessidades de sua educação." },
  { id:"CC206", art:"Art. 1.695", titulo:"Obrigação de Prestar Alimentos", desc:"São devidos os alimentos quando quem os pretende não tem bens suficientes, nem pode prover, pelo seu trabalho, à própria mantença, e aquele, de quem se reclamam, pode fornecê-los, sem desfalque do necessário ao seu sustento." },
  { id:"CC207", art:"Art. 1.700", titulo:"Transmissão da Obrigação Alimentar", desc:"A obrigação de prestar alimentos transmite-se aos herdeiros do devedor, na forma do art. 1.694." },
  { id:"CC208", art:"Art. 1.711", titulo:"Bem de Família", desc:"Podem os cônjuges, ou a entidade familiar, mediante escritura pública ou testamento, destinar parte de seu patrimônio para instituir bem de família, desde que não ultrapasse um terço do patrimônio líquido existente ao tempo da instituição." },
  { id:"CC209", art:"Art. 1.723", titulo:"União Estável", desc:"É reconhecida como entidade familiar a união estável entre o homem e a mulher, configurada na convivência pública, contínua e duradoura e estabelecida com o objetivo de constituição de família." },
  { id:"CC210", art:"Art. 1.724", titulo:"Deveres na União Estável", desc:"As relações pessoais entre os companheiros obedecerão aos deveres de lealdade, respeito e assistência, e de guarda, sustento e educação dos filhos." },
  { id:"CC211", art:"Art. 1.731", titulo:"Tutela", desc:"Em falta dos pais, ou dos avós, a tutela compete ao parente mais próximo do menor, observada a gradação de parentesco." },
  { id:"CC212", art:"Art. 1.732", titulo:"Curatela", desc:"O juiz nomeará curador: ao incapaz de exercer os atos da vida civil; ao que, por causa transitória ou permanente, não puder exprimir sua vontade." },
  { id:"CC213", art:"Art. 1.784", titulo:"Abertura da Sucessão", desc:"Aberta a sucessão, a herança transmite-se, desde logo, aos herdeiros legítimos e testamentários." },
  { id:"CC214", art:"Art. 1.786", titulo:"Espécies de Sucessão", desc:"A sucessão dá-se por lei ou por disposição de última vontade." },
  { id:"CC215", art:"Art. 1.788", titulo:"Sucessão Legítima e Testamentária", desc:"Morrendo a pessoa sem testamento, transmite a herança aos herdeiros legítimos; o mesmo ocorrerá quanto aos bens que não forem compreendidos no testamento; e subsiste a sucessão legítima se o testamento caducar, ou for julgado nulo." },
  { id:"CC216", art:"Art. 1.790", titulo:"Sucessão do Companheiro", desc:"A companheira ou o companheiro participará da sucessão do outro, quanto aos bens adquiridos onerosamente na vigência da união estável, nas condições seguintes." },
  { id:"CC217", art:"Art. 1.799", titulo:"Capacidade para Suceder por Testamento", desc:"Na sucessão testamentária podem ainda ser chamados a suceder: os filhos, ainda não concebidos, de pessoas indicadas pelo testador, desde que vivas estas ao abrir-se a sucessão." },
  { id:"CC218", art:"Art. 1.804", titulo:"Aceitação da Herança", desc:"Aceita a herança, torna-se definitiva a sua transmissão ao herdeiro, desde a abertura da sucessão." },
  { id:"CC219", art:"Art. 1.808", titulo:"Renúncia da Herança", desc:"Não se pode aceitar ou renunciar herança em parte, sob condição ou a termo." },
  { id:"CC220", art:"Art. 1.829", titulo:"Ordem de Vocação Hereditária", desc:"A sucessão legítima defere-se na ordem seguinte: aos descendentes, em concorrência com o cônjuge sobrevivente; aos ascendentes, em concorrência com o cônjuge; ao cônjuge sobrevivente; aos colaterais." },
  { id:"CC221", art:"Art. 1.832", titulo:"Quinhão do Cônjuge na Herança", desc:"Em concorrência com os descendentes, caberá ao cônjuge quinhão igual ao dos que sucederem por cabeça, não podendo a sua quota ser inferior à quarta parte da herança." },
  { id:"CC222", art:"Art. 1.845", titulo:"Herdeiros Necessários", desc:"São herdeiros necessários os descendentes, os ascendentes e o cônjuge." },
  { id:"CC223", art:"Art. 1.846", titulo:"Legítima", desc:"Pertence aos herdeiros necessários, de pleno direito, a metade dos bens da herança, constituindo a legítima." },
  { id:"CC224", art:"Art. 1.857", titulo:"Testamento", desc:"Toda pessoa capaz pode dispor, por testamento, da totalidade dos seus bens, ou de parte deles, para depois de sua morte." },
  { id:"CC225", art:"Art. 1.860", titulo:"Capacidade Testamentária", desc:"Além dos incapazes, não podem testar os que, no ato de fazê-lo, não tiverem pleno discernimento. O menor com dezesseis anos completos pode fazer testamento." },
  { id:"CC226", art:"Art. 1.862", titulo:"Formas Ordinárias de Testamento", desc:"São testamentos ordinários: o público, o cerrado e o particular." },
  { id:"CC227", art:"Art. 1.864", titulo:"Testamento Público", desc:"São requisitos essenciais do testamento público: ser escrito por tabelião ou por seu substituto legal em seu livro de notas, de acordo com as declarações do testador." },
  { id:"CC228", art:"Art. 1.876", titulo:"Testamento Cerrado", desc:"O testamento cerrado pode ser escrito pelo testador, ou por outrem, a seu rogo, e por aquele assinado. Será válido se aprovado pelo tabelião." },
  { id:"CC229", art:"Art. 1.888", titulo:"Testamento Particular", desc:"Pode o testador substituir o testamento cerrado pelo particular. O testamento pode ser escrito de próprio punho ou mediante processo mecânico." },
  { id:"CC230", art:"Art. 1.909", titulo:"Anulação de Disposição Testamentária", desc:"São anuláveis as disposições testamentárias inquinadas de erro, dolo ou coação. Em se tratando de erro, o juiz pode adotar medidas para corrigi-lo." },
  { id:"CC231", art:"Art. 1.916", titulo:"Legados", desc:"O legado de crédito, ou de quitação de dívida, terá eficácia somente até a concorrência da importância desta ao tempo da morte do testador." },
  { id:"CC232", art:"Art. 1.950", titulo:"Colação", desc:"O filho que recebeu do pai, por doação ou dote, bens que constituem o seu quinhão hereditário, ou além deste, só tem direito ao que foi além, com igualdade com os demais herdeiros." },
  { id:"CC233", art:"Art. 1.963", titulo:"Deserdação", desc:"Além das causas mencionadas no art. 1.814, autorizam a deserdação dos descendentes por seus ascendentes: ofensa física, injúria grave, relações ilícitas com a madrasta ou o padrasto." },
  { id:"CC234", art:"Art. 1.973", titulo:"Indignidade", desc:"Sobrevivendo o indigno ao ofendido, poderá o testador reabilitá-lo por testamento, ou outro ato autêntico; nesse caso, a indignidade tem por limite o que foi disposto a favor do reabilitado." },
  { id:"CC235", art:"Art. 1.977", titulo:"Exclusão do Indigno", desc:"A sentença que se pronunciar sobre a exclusão do herdeiro ou legatário produz efeitos desde a abertura da sucessão." },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const STORAGE_KEY_PENAL = "lawmatch_known_penal";
const STORAGE_KEY_CIVIL = "lawmatch_known_civil";

const getKnown = (mode) => {
  try {
    const k = mode === "penal" ? STORAGE_KEY_PENAL : STORAGE_KEY_CIVIL;
    return new Set(JSON.parse(localStorage.getItem(k) || "[]"));
  } catch { return new Set(); }
};

const saveKnown = (mode, set) => {
  try {
    const k = mode === "penal" ? STORAGE_KEY_PENAL : STORAGE_KEY_CIVIL;
    localStorage.setItem(k, JSON.stringify([...set]));
  } catch {}
};

const getLevelInfo = (score) => {
  if (score <= 30) return { label: "Leigo Curioso", icon: "⚖️", color: "#94a3b8" };
  if (score <= 70) return { label: "Cidadão Consciente", icon: "🏛️", color: "#f59e0b" };
  return { label: "Especialista Falkon", icon: "🦅", color: "#fbbf24" };
};

// ─── SWIPE CARD ──────────────────────────────────────────────────────────────
function SwipeCard({ card, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const rightOpacity = useTransform(x, [20, 100], [0, 1]);
  const leftOpacity = useTransform(x, [-100, -20], [1, 0]);
  const goldGlowOp = useTransform(x, [0, 150], [0, 1]);
  const silverGlowOp = useTransform(x, [-150, 0], [1, 0]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 100) onSwipe("right");
    else if (info.offset.x < -100) onSwipe("left");
    else animate(x, 0, { type: "spring", stiffness: 300, damping: 20 });
  };

  return (
    <div style={{ position: "relative", width: "100%", height: 400 }}>
      <motion.div style={{ opacity: goldGlowOp, position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none", boxShadow: "0 0 70px 25px rgba(245,158,11,0.3)" }} />
      <motion.div style={{ opacity: silverGlowOp, position: "absolute", inset: 0, borderRadius: 24, pointerEvents: "none", boxShadow: "0 0 70px 25px rgba(148,163,184,0.25)" }} />
      <motion.div
        drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.8}
        style={{ x, rotate, position: "absolute", width: "100%", height: "100%", cursor: "grab", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 28 }}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div style={{ opacity: rightOpacity, position: "absolute", top: 20, left: 20, background: "rgba(245,158,11,0.15)", border: "2px solid #f59e0b", color: "#f59e0b", fontWeight: 900, fontSize: 14, padding: "6px 14px", borderRadius: 10, transform: "rotate(-12deg)" }}>
          CONHEÇO ✓
        </motion.div>
        <motion.div style={{ opacity: leftOpacity, position: "absolute", top: 20, right: 20, background: "rgba(148,163,184,0.15)", border: "2px solid #94a3b8", color: "#94a3b8", fontWeight: 900, fontSize: 14, padding: "6px 14px", borderRadius: 10, transform: "rotate(12deg)" }}>
          PASSA →
        </motion.div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(245,158,11,0.6)", textTransform: "uppercase", fontFamily: "monospace" }}>Código {card.id.startsWith("CC") ? "Civil" : "Penal"} Brasileiro</span>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: "#f59e0b", margin: 0, lineHeight: 1.1 }}>{card.art}</h2>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: 0 }}>{card.titulo}</h3>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
        </div>
        <div style={{ position: "absolute", bottom: 20, left: 28, right: 28, display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          <span>← Não conheço</span>
          <span style={{ color: "rgba(245,158,11,0.4)" }}>⟷ arraste</span>
          <span>Conheço →</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function LawMatch() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState(null); // "penal" | "civil"
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cardKey, setCardKey] = useState(0);
  const [newlyLearned, setNewlyLearned] = useState([]);

  const startGame = useCallback((selectedMode) => {
    const db = selectedMode === "penal" ? PENAL : CIVIL;
    const picked = shuffle(db).slice(0, 10);
    setMode(selectedMode);
    setDeck(picked);
    setIdx(0);
    setScore(0);
    setAnswers([]);
    setNewlyLearned([]);
    setCardKey(k => k + 1);
    setScreen("game");
  }, []);

  const handleSwipe = useCallback((dir) => {
    const card = deck[idx];
    const pts = dir === "right" ? 10 : 0;
    const newScore = score + pts;
    const newAnswers = [...answers, { art: card.art, titulo: card.titulo, id: card.id, dir }];

    let learned = [...newlyLearned];
    if (dir === "right") {
      const known = getKnown(mode);
      if (!known.has(card.id)) {
        known.add(card.id);
        saveKnown(mode, known);
        learned = [...learned, card];
      }
    }

    setScore(newScore);
    setAnswers(newAnswers);
    setNewlyLearned(learned);

    if (idx + 1 >= 10) {
      setTimeout(() => setScreen("result"), 300);
    } else {
      setIdx(i => i + 1);
      setCardKey(k => k + 1);
    }
  }, [deck, idx, score, answers, newlyLearned, mode]);

  const totalKnown = mode ? getKnown(mode).size : 0;
  const dbSize = mode === "penal" ? PENAL.length : CIVIL.length;
  const level = getLevelInfo(score);

  const S = {
    root: { minHeight: "100vh", background: "#09090b", fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 8px" },
    brand: { fontSize: 10, fontFamily: "monospace", letterSpacing: "0.3em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase", userSelect: "none" },
    badge: (color) => ({ fontSize: 11, color, fontFamily: "monospace", padding: "3px 10px", border: `1px solid ${color}40`, borderRadius: 20 }),
    goldBtn: { background: "linear-gradient(135deg,#f59e0b,#fbbf24)", color: "#000", fontWeight: 900, fontSize: 15, border: "none", borderRadius: 16, padding: "14px 0", cursor: "pointer", width: "100%", letterSpacing: "0.05em" },
    ghostBtn: { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", fontWeight: 700, fontSize: 13, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "12px 0", cursor: "pointer", width: "100%" },
  };

  return (
    <div style={S.root}>
      {/* HEADER */}
      <div style={S.header}>
        <span style={S.brand}>Falkon AI</span>
        {screen === "game" && <span style={S.badge("#f59e0b")}>{score} pts</span>}
        {screen === "result" && <span style={S.badge("#94a3b8")}>Resultado</span>}
      </div>

      {/* ── HOME ── */}
      {screen === "home" && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px 40px", gap: 32, maxWidth: 480, margin: "0 auto", width: "100%" }}>
          <div style={{ textAlign: "center" }}>
            <motion.div animate={{ rotate: [0, 6, -6, 0] }} transition={{ repeat: Infinity, duration: 4 }} style={{ fontSize: 64, marginBottom: 12 }}>⚖️</motion.div>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-2px" }}>Law<span style={{ color: "#f59e0b" }}>Match</span></h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginTop: 10, lineHeight: 1.6, maxWidth: 320, margin: "10px auto 0" }}>
              Arraste os cards para testar seu conhecimento jurídico. Direita = conheço. Esquerda = não conheço.
            </p>
          </div>

          <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 360 }}>
            {[{ key: "penal", label: "Código Penal", icon: "🔒", desc: `${PENAL.length} artigos` }, { key: "civil", label: "Código Civil", icon: "📜", desc: `${CIVIL.length} artigos` }].map(m => (
              <motion.button key={m.key} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => startGame(m.key)}
                style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "20px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 32 }}>{m.icon}</span>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{m.label}</span>
                <span style={{ color: "#f59e0b", fontSize: 11, fontFamily: "monospace" }}>{m.desc}</span>
              </motion.button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 24, textAlign: "center" }}>
            {[["10", "Rodadas"], ["100", "Pts máx."], ["50+", "Leis/modo"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#f59e0b" }}>{val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── GAME ── */}
      {screen === "game" && deck.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 20px 28px", gap: 16, maxWidth: 520, margin: "0 auto", width: "100%" }}>
          {/* Progress */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
              <span>{mode === "penal" ? "🔒 Código Penal" : "📜 Código Civil"}</span>
              <span style={{ fontFamily: "monospace" }}>{idx + 1} / 10</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
              <motion.div animate={{ width: `${((idx + 1) / 10) * 100}%` }} transition={{ duration: 0.4 }}
                style={{ height: "100%", background: "linear-gradient(90deg,#f59e0b,#fbbf24)", borderRadius: 4 }} />
            </div>
          </div>

          {/* Card */}
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <motion.div key={cardKey} style={{ width: "100%" }} initial={{ x: 80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
              <SwipeCard card={deck[idx]} onSwipe={handleSwipe} />
            </motion.div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <motion.button whileTap={{ scale: 0.94 }} onClick={() => handleSwipe("left")}
              style={{ ...S.ghostBtn, flex: 1 }}>← Não conheço</motion.button>
            <motion.button whileTap={{ scale: 0.94 }} onClick={() => handleSwipe("right")}
              style={{ ...S.goldBtn, flex: 1 }}>Conheço +10 →</motion.button>
          </div>
        </motion.div>
      )}

      {/* ── RESULT ── */}
      {screen === "result" && (
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 24px 36px", gap: 20, maxWidth: 520, margin: "0 auto", width: "100%", overflowY: "auto" }}>
          <div style={{ textAlign: "center" }}>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: 2, duration: 0.5 }} style={{ fontSize: 52, marginBottom: 8 }}>{level.icon}</motion.div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: 0 }}>Resultado Final</h2>
          </div>

          {/* Score ring */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: 140, height: 140 }}>
              <svg width="140" height="140" style={{ position: "absolute" }}>
                <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="9" />
                <motion.circle cx="70" cy="70" r="58" fill="none" stroke="#f59e0b" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray={364} initial={{ strokeDashoffset: 364 }}
                  animate={{ strokeDashoffset: 364 - (score / 100) * 364 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} transform="rotate(-90 70 70)" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  style={{ fontSize: 36, fontWeight: 900, color: level.color, lineHeight: 1 }}>{score}</motion.div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>de 100</div>
              </div>
            </div>
          </div>

          {/* Level */}
          <div style={{ borderRadius: 16, border: `1px solid ${level.color}30`, background: `${level.color}10`, padding: "14px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>Nível de Cidadania</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: level.color }}>{level.label}</div>
          </div>

          {/* Leis novas aprendidas */}
          {newlyLearned.length > 0 && (
            <div style={{ borderRadius: 16, border: "1px solid rgba(251,191,36,0.25)", background: "rgba(251,191,36,0.06)", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 18 }}>🆕</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#fbbf24" }}>{newlyLearned.length} lei{newlyLearned.length > 1 ? "s" : ""} nova{newlyLearned.length > 1 ? "s" : ""} aprendida{newlyLearned.length > 1 ? "s" : ""}!</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {newlyLearned.map(c => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "6px 12px" }}>
                    <span style={{ fontSize: 12, color: "#f59e0b", fontFamily: "monospace" }}>{c.art}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", maxWidth: 200, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.titulo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {newlyLearned.length === 0 && (
            <div style={{ borderRadius: 16, border: "1px solid rgba(148,163,184,0.2)", background: "rgba(148,163,184,0.05)", padding: 14, textAlign: "center" }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Nenhuma lei nova desta rodada — você já conhecia todas!</span>
            </div>
          )}

          {/* Progresso total */}
          <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", padding: 14 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Progresso {mode === "penal" ? "Código Penal" : "Código Civil"}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(totalKnown / dbSize) * 100}%` }} transition={{ duration: 1, delay: 0.5 }}
                  style={{ height: "100%", background: "linear-gradient(90deg,#f59e0b,#fbbf24)", borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#f59e0b", fontFamily: "monospace", minWidth: 60, textAlign: "right" }}>{totalKnown}/{dbSize}</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>leis que você conhece neste código</div>
          </div>

          {/* Resumo de respostas */}
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Resumo da Rodada</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {answers.map((a, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, padding: "7px 14px" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{a.art}</span>
                  {a.dir === "right"
                    ? <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 800 }}>+10 pts ✓</span>
                    : <span style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>—</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => startGame(mode)}
              style={{ ...S.goldBtn, flex: 2 }}>🔄 Jogar de Novo</motion.button>
            <motion.button whileTap={{ scale: 0.96 }} onClick={() => setScreen("home")}
              style={{ ...S.ghostBtn, flex: 1 }}>🏠 Menu</motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}