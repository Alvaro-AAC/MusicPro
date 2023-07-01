// JavaScript Document

function init() {
	var ciudad = document.getElementById('ciudad');
	var region = $('#region');
	region.change(function() {
		if(region.val()=='1') {
			ciudad.innerHTML=
			`
			<optgroup label="I - Región de Tarapacá">
				<option value="0">Iquique</option>
				<option value="1">Alto Hospicio</option>       
				<option value="2">Pozo Almonte</option>        
			</optgroup>  
			`;
		} else if(region.val()=='2') {
			ciudad.innerHTML=
			`
			<optgroup label="II - Región de Antofagasta">       
				<option value="3">Antofagasta</option>
				<option value="4">Mejillones</option>
				<option value="5">Taltal</option>
				<option value="6">Calama</option>
				<option value="7">San Pedro de Atacama</option>
				<option value="8">Tocopilla</option>
			</optgroup>  
			`;
		} else if(region.val()=='3') {
			ciudad.innerHTML=
			`
			</optgroup>
				<optgroup label="III - Región de Atacama">
				<option value="9">Copiapó</option>
				<option value="10">Caldera</option>
				<option value="11">Tierra Amarilla</option>
				<option value="12">Chañaral</option>
				<option value="13">El Salvador</option>
				<option value="14">Diego de Almagro</option>
				<option value="15">Vallenar</option>
				<option value="16">Huasco</option>
			</optgroup> 
			`;
		} else if(region.val()=='4') {
			ciudad.innerHTML=
			`
			<optgroup label="IV - Región de Coquimbo">
				<option value="17">La Serena</option>
				<option value="18">Tongoy</option>
				<option value="19">Coquimbo</option>
				<option value="20">Andacollo</option>
				<option value="21">Vicuña</option>
				<option value="22">Illapel</option>
				<option value="23">Los Vilos</option>
				<option value="24">Salamanca</option>
				<option value="25">Ovalle</option>
				<option value="26">Combarbalá</option>
				<option value="27">Monte Patria</option>
				<option value="28">El Palqui</option>
				<option value="29">Punitaqui</option>
			</optgroup> 
			`;
		} else if(region.val()=='5') {
			ciudad.innerHTML=
			`
			<optgroup label="V - Región de Valparaíso">
				<option value="30">Valparaíso</option>
				<option value="31">Placilla de Peñuelas</option>
				<option value="32">Casablanca</option>
				<option value="33">Concón</option>
				<option value="34">Puchuncaví</option>
				<option value="35">Las Ventanas</option>
				<option value="36">Quintero</option>
				<option value="37">Viña del Mar</option>
				<option value="38">Hanga Roa</option>
				<option value="39">Los Andes</option>
				<option value="40">Calle Larga</option>
				<option value="41">Rinconada</option>
				<option value="42">San Esteban</option>
				<option value="43">La Ligua</option>
				<option value="44">Cabildo</option>
				<option value="45">Quillota</option>
				<option value="46">La Calera</option>
				<option value="47">Hijuelas</option>
				<option value="48">La Cruz</option>
				<option value="49">El Melón</option>
				<option value="50">Nogales</option>
				<option value="51">San Antonio</option>
				<option value="52">Mirasol - El Yeco</option>
				<option value="53">Algarrobo</option>
				<option value="54">Cartagena</option>
				<option value="55">El Quisco</option>
				<option value="56">Las Cruces</option>
				<option value="57">El Tabo</option>
				<option value="58">Santo Domingo</option>
				<option value="59">San Felipe</option>
				<option value="60">Catemu</option>
				<option value="61">Llaillay</option>
				<option value="62">Putaendo</option>
				<option value="63">Santa María</option>
				<option value="64">Villa los Almendros</option>
				<option value="65">Quilpué</option>
				<option value="66">Limache</option>
				<option value="67">Olmué</option>
				<option value="68">Villa Alemana</option>
			</optgroup>
			`;
		} else if(region.val()=='6') {
			ciudad.innerHTML=
			`
			<optgroup label="VI - Región del Libertador General Bernardo O'Higgins">
				<option value="69">Rancagua</option>
				<option value="70">Codegua</option>
				<option value="71">Doñihue</option>
				<option value="72">Coltauco</option>
				<option value="73">Lo Miranda</option>
				<option value="74">Doñihue</option>
				<option value="75">Graneros</option>
				<option value="76">Las Cabras</option>
				<option value="77">Machalí</option>
				<option value="78">San Francisco de Mostazal</option>
				<option value="79">La Punta</option>
				<option value="80">Gultro</option>
				<option value="81">Punta de Diamante</option>
				<option value="82">Peumo</option>
				<option value="83">Pichidegua</option>
				<option value="84">Quinta de Tilcoco</option>
				<option value="85">Rengo</option>
				<option value="86">Los Lirios</option>
				<option value="87">Requínoa</option>
				<option value="88">San Vicente de Tagua Tagua</option>
				<option value="89">Pichilemu</option>
				<option value="90">San Fernando</option>
				<option value="91">Chépica</option>
				<option value="92">Chimbarongo</option>
				<option value="93">Nancagua</option>
				<option value="94">Peralillo</option>
				<option value="95">Santa Cruz</option>
			</optgroup>
			`;
		} else if(region.val()=='7') {
			ciudad.innerHTML=
			`
			<optgroup label="VII - Región del Maule">
				<option value="96">Talca</option>
				<option value="97">Constitución</option>
				<option value="98">Maule</option>
				<option value="99">Culenar</option>
				<option value="100">San Clemente</option>
				<option value="101">Cauquenes</option>
				<option value="102">Curicó</option>
				<option value="103">Hualañé</option>
				<option value="104">Molina</option>
				<option value="105">Rauco</option>
				<option value="106">Romeral</option>
				<option value="107">Teno</option>
				<option value="108">Linares</option>
				<option value="109">Colbún</option>
				<option value="110">Longaví</option>
				<option value="111">Parral</option>
				<option value="112">Retiro</option>
				<option value="113">San Javier</option>
				<option value="114">Villa Alegre</option>
			</optgroup> 
			`;
		} else if(region.val()=='8') {
			ciudad.innerHTML=
			`
			<optgroup label="VIII - Región del Biobío">
				<option value="115">Concepción</option>
				<option value="116">Coronel</option>
				<option value="117">Chiguayante</option>
				<option value="118">Hualqui</option>
				<option value="119">Lota</option>
				<option value="120">Penco</option>
				<option value="121">San Pedro de la Paz</option>
				<option value="122">Santa Juana</option>
				<option value="123">Talcahuano</option>
				<option value="124">Tomé</option>
				<option value="125">Hualpén</option>
				<option value="126">Lebu</option>
				<option value="127">Laraquete</option>
				<option value="128">Arauco</option>
				<option value="129">Cañete</option>
				<option value="130">Curanilahue</option>
				<option value="131">Los Álamos</option>
				<option value="132">Los Ángeles</option>
				<option value="133">Cabrero</option>
				<option value="134">Monte águila</option>
				<option value="135">La Laja</option>
				<option value="136">Mulchén</option>
				<option value="137">Nacimiento</option>
				<option value="138">San Rosendo</option>
				<option value="139">Santa Bárbara</option>
				<option value="140">Huépil</option>
				<option value="141">Yumbel</option>
			</optgroup>			`;
		} else if(region.val()=='8') {
			ciudad.innerHTML=
			`
			<optgroup label="VIII - Región del Biobío">
				<option value="115">Concepción</option>
				<option value="116">Coronel</option>
				<option value="117">Chiguayante</option>
				<option value="118">Hualqui</option>
				<option value="119">Lota</option>
				<option value="120">Penco</option>
				<option value="121">San Pedro de la Paz</option>
				<option value="122">Santa Juana</option>
				<option value="123">Talcahuano</option>
				<option value="124">Tomé</option>
				<option value="125">Hualpén</option>
				<option value="126">Lebu</option>
				<option value="127">Laraquete</option>
				<option value="128">Arauco</option>
				<option value="129">Cañete</option>
				<option value="130">Curanilahue</option>
				<option value="131">Los Álamos</option>
				<option value="132">Los Ángeles</option>
				<option value="133">Cabrero</option>
				<option value="134">Monte águila</option>
				<option value="135">La Laja</option>
				<option value="136">Mulchén</option>
				<option value="137">Nacimiento</option>
				<option value="138">San Rosendo</option>
				<option value="139">Santa Bárbara</option>
				<option value="140">Huépil</option>
				<option value="141">Yumbel</option>
			</optgroup>
			`;
		} else if(region.val()=='9') {
			ciudad.innerHTML=
			`
			<optgroup label="IX - Región de la Araucanía">
				<option value="142">Labranza</option>
				<option value="143">Temuco</option>
				<option value="144">Carahue</option>
				<option value="145">Cunco</option>
				<option value="146">Freire</option>
				<option value="147">Gorbea</option>
				<option value="148">Lautaro</option>
				<option value="149">Loncoche</option>
				<option value="150">Nueva Imperial</option>
				<option value="151">Padre las Casas</option>
				<option value="152">Pitrufquén</option>
				<option value="153">Pucón</option>
				<option value="154">Vilcún</option>
				<option value="155">Cajón</option>
				<option value="156">Villarrica</option>
				<option value="157">Angol</option>
				<option value="158">Collipulli</option>
				<option value="159">Curacautín</option>
				<option value="160">Purén</option>
				<option value="161">Renaico</option>
				<option value="162">Traiguén</option>
				<option value="163">Victoria</option>
			</optgroup>
			`;
		} else if(region.val()=='10') {
			ciudad.innerHTML=
			`
			<optgroup label="X - Región de los Lagos">
				<option value="164">Alerce</option>
				<option value="165">Puerto Montt</option>
				<option value="166">Calbuco</option>
				<option value="167">Fresia</option>
				<option value="168">Frutillar</option>
				<option value="169">Los Muermos</option>
				<option value="170">Llanquihue</option>
				<option value="171">Puerto Varas</option>
				<option value="172">Castro</option>
				<option value="173">Ancud</option>
				<option value="174">Chonchi</option>
				<option value="175">Dalcahue</option>
				<option value="176">Quellón</option>
				<option value="177">Osorno</option>
				<option value="178">Purranque</option>
				<option value="179">Río Negro</option>
				<option value="180">Chaitén</option>
			</optgroup> 
			`;
		} else if(region.val()=='11') {
			ciudad.innerHTML=
			`
			<optgroup label="XI - Región de Aysén">
				<option value="181">Coyhaique</option>
				<option value="182">Puerto Aysén</option>
				<option value="183">Cochrane</option>
				<option value="184">Chile Chico</option>
			</optgroup>
			`;
		} else if(region.val()=='12') {
			ciudad.innerHTML=
			`
			<optgroup label="XII - Región De Magallanes y de la Antártica Chilena">
				<option value="185">Punta Arenas</option>
				<option value="186">Puerto Williams</option>
				<option value="187">Porvenir</option>
				<option value="188">Puerto Natales</option>
			</optgroup> 
			`;
		} else if(region.val()=='13') {
			ciudad.innerHTML=
			`
			<optgroup label="RM - Región Metropolitana de Santiago">
				<option value="189" selected="selected">Santiago</option>
				<option value="190">Cerrillos</option>
				<option value="191">Cerro Navia</option>
				<option value="192">Conchalí</option>
				<option value="193">El Bosque</option>
				<option value="194">Estación Ccentral</option>
				<option value="195">Huechuraba</option>
				<option value="196">Independencia</option>
				<option value="197">La Cisterna</option>
				<option value="198">La Florida</option>
				<option value="199">La Granja</option>
				<option value="200">La Pintana</option>
				<option value="201">La Reina</option>
				<option value="202">Las Condes</option>
				<option value="203">Lo Barnechea</option>
				<option value="204">Lo Espejo</option>
				<option value="205">Lo Prado</option>
				<option value="206">Macul</option>
				<option value="207">Maipú</option>
				<option value="208">Ñuñoa</option>
				<option value="209">Pedro Aguirre Cerda</option>
				<option value="210">Peñalolén</option>
				<option value="211">Providencia</option>
				<option value="212">Pudahuel</option>
				<option value="213">Ciudad del Valle</option>
				<option value="214">Qulicura</option>
				<option value="215">Quinta Normal</option>
				<option value="216">Recoleta</option>
				<option value="217">Renca</option>
				<option value="218">San Joaquín</option>
				<option value="219">San Miguel</option>
				<option value="220">San Ramón</option>
				<option value="221">Vitacura</option>
				<option value="222">Puente Alto</option>
				<option value="223">Pirque</option>
				<option value="224">El Principal</option>
				<option value="225">San José de Maipo</option>
				<option value="226">La obra - Las Vertientes</option>
				<option value="227">Colina</option>
				<option value="228">Chicureo</option>
				<option value="229">Chamisero</option>
				<option value="230">Batuco</option>
				<option value="231">Lampa</option>
				<option value="232">Valle grande</option>
				<option value="233">Chicauma</option>
				<option value="234">Tiltil</option>
				<option value="235">San Bernardo</option>
				<option value="236">Alto Jahuel</option>
				<option value="237">Buin</option>
				<option value="238">Bajos de San Agustín</option>
				<option value="239">Paine</option>
				<option value="240">Hospital</option>
				<option value="241">Bollenar</option>
				<option value="242">Melipilla</option>
				<option value="243">Curacaví</option>
				<option value="244">Talagante</option>
				<option value="245">El Monte</option>
				<option value="246">Isla de Maipo</option>
				<option value="247">La Islita</option>
				<option value="248">Padre Hurtado</option>
				<option value="249">Peñaflor</option>
			</optgroup> 
			`;
		} else if(region.val()=='14') {
			ciudad.innerHTML=
			`
			<optgroup label="XIV - Región de los Ríos">
				<option value="250">Valdivia</option>
				<option value="251">Lanco</option>
				<option value="252">Los Lagos</option>
				<option value="253">San José de la Mariquina</option>
				<option value="254">Paillaco</option>
				<option value="255">Panguipulli</option>
				<option value="256">La Unión</option>
				<option value="257">Futrono</option>
				<option value="258">Río Bueno</option>
			</optgroup> 
			`;
		} else if(region.val()=='15') {
			ciudad.innerHTML=
			`
			<optgroup label="XV - Región de Arica y Parinacota">
				<option value="259">Arica</option>
				<option value="270">Parinacota</option>
				<option value="260">Putre</option>
			</optgroup>
			`;
		} else if(region.val()=='16') {
			ciudad.innerHTML=
			`
			<optgroup label="XVI - Región de Ñuble">
				<option value="261">Chillán</option>
				<option value="262">Bulnes</option>
				<option value="263">Chillán Viejo</option>
				<option value="264">Quillón</option>
				<option value="265">Yungay</option>
				<option value="266">Quirihue</option>
				<option value="267">Coelemu</option>
				<option value="268">San Carlos</option>
				<option value="269">Coihueco</option>
			</optgroup>
			`;
		}
	})
	
}

window.addEventListener('load', init);