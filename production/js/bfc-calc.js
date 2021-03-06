var exp_table_1 = [];
var exp_table_2 = [];
var exp_table_3 = [];
var count_remaining_exp = false;

function metal_exp()
{
	var metal_crystal_same	= 227286;
	var metal_crystal		= 151524;
	var metal_god_same 		= 77277;
	var metal_god 			= 51518;
	var metal_king_same 	= 16518;
	var metal_king 			= 11012;
	var metal_slime_same 	= 2259;
	var metal_slime 		= 1506;
	
	var total_exp = 0, total_exp_great = 0, total_exp_super = 0;
	
	// Metal Crystal
	if($("#metal_crystal_same_check").is(":checked"))
		total_exp += (metal_crystal_same * $("#metal_crystal").val());
	else
		total_exp += (metal_crystal * $("#metal_crystal").val());
		
	// Metal God
	if($("#metal_god_same_check").is(":checked"))
		total_exp += (metal_god_same * $("#metal_god").val());
	else
		total_exp += (metal_god * $("#metal_god").val());
	
	// Metal King
	if($("#metal_king_same_check").is(":checked"))
		total_exp += (metal_king_same * $("#metal_king").val());
	else
		total_exp += (metal_king * $("#metal_king").val());
		
	// Metal Slime
	if($("#metal_slime_same_check").is(":checked"))
		total_exp += (metal_slime_same * $("#metal_slime").val());
	else
		total_exp += (metal_slime * $("#metal_slime").val());
	
	total_exp_great = total_exp * 1.5;
	total_exp_super = total_exp * 2.0;
	
	$("#metal_exp").val(total_exp);
	$("#metal_exp_great").val(total_exp_great);
	$("#metal_exp_super").val(total_exp_super);
}

function jewel_exp()
{
	var jewel_god 			= 50000;
	var jewel_king 			= 20000;
	var jewel_ghost 		= 7000;
	
	var total_zel = 0, jewel_god_zel = 0, jewel_king_zel = 0, jewel_ghost_zel = 0;
	
	jewel_god_zel = jewel_god * $("#jewel_god").val();
	jewel_king_zel = jewel_king * $("#jewel_king").val();
	jewel_ghost_zel = jewel_ghost * $("#jewel_ghost").val();
	total_zel = jewel_god_zel + jewel_king_zel + jewel_ghost_zel;
	
	$("#jewel_ghost_output").val(jewel_ghost_zel);
	$("#jewel_king_output").val(jewel_king_zel);
	$("#jewel_god_output").val(jewel_god_zel);
	$("#jewel_zel").val(total_zel);
}

function calculate()
{
	// Which calculation are we doing?
	var calc_type = $("#calc_selection").val();
	
	var exp_table = $("#exp_table").val();
	var current_lv = $("#current_lv").val();
	var exp_to_next_lv = $("#exp_to_next_lv").val()?$("#exp_to_next_lv").val():0;
	
	var selected_exp_table;
	
	if(exp_table == "" || current_lv == "")
	{
		alert("Please fill up all the forms");
	}	
	else
	{
		// Select Appropriate exp_table
		if (exp_table == 1)
			selected_exp_table = exp_table_1;
		else if(exp_table == 2)
			selected_exp_table = exp_table_2;
		else
			selected_exp_table = exp_table_3;
		
		// Get Current EXP
		var next_lv = parseInt(current_lv)+1;
		var current_exp;

		if(count_remaining_exp)
			current_exp = selected_exp_table[current_lv] + ((selected_exp_table[next_lv] - selected_exp_table[current_lv]) - exp_to_next_lv);
		else
			current_exp = selected_exp_table[current_lv];
		
		if(calc_type == 1)
		{
			// Get required EXP given xx level
			var target_lv = $("#target_lv").val();
			var required_exp = selected_exp_table[target_lv] - current_exp;
			
			// Output
			$("#out_required_exp").val(required_exp);
		}
		else
		{
			// What level will I be when I give xx EXP
			var fuse_exp = $("#fuse_exp").val();
			var final_exp, final_level, final_leftover_exp_to_next_lv, final_bool;
			var final_exp_great, final_level_great, final_leftover_exp_to_next_lv_great, final_bool_great;
			var final_exp_super, final_level_super, final_leftover_exp_to_next_lv_super, final_bool_super;
			
			final_exp = current_exp + parseInt(fuse_exp);
			final_exp_great = final_exp * 1.5;
			final_exp_super = final_exp * 2.0;
			
			final_bool = false;
			final_bool_great = false;
			final_bool_super = false;
			
			for(var i = current_lv; i<selected_exp_table.length; i++)
			{
				// Normal
				if (final_exp == selected_exp_table[i] && final_bool == false)
				{
					final_level = i;
					final_leftover_exp_to_next_lv = 0;
					final_bool = true;
				}
				else if (final_exp < selected_exp_table[i] && final_bool == false)
				{
					final_level = i-1;
					final_leftover_exp_to_next_lv = selected_exp_table[i] - final_exp;
					final_bool = true;
				}
				
				// Great
				if (final_exp_great == selected_exp_table[i] && final_bool_great == false)
				{
					final_level_great = i;
					final_leftover_exp_to_next_lv_great = 0;
					final_bool_great = true;
				}
				else if (final_exp_great < selected_exp_table[i] && final_bool_great == false)
				{
					final_level_great = i-1;
					final_leftover_exp_to_next_lv_great = selected_exp_table[i] - final_exp_great;
					final_bool_great = true;
				}
				
				// Super
				if (final_exp_super == selected_exp_table[i] && final_bool_super == false)
				{
					final_level_super = i;
					final_leftover_exp_to_next_lv_super = 0;
					final_bool_super = true;
				}
				else if (final_exp_super < selected_exp_table[i] && final_bool_super == false)
				{
					final_level_super = i-1;
					final_leftover_exp_to_next_lv_super = selected_exp_table[i] - final_exp_super;
					final_bool_super = true;
				}
			}
			
			// Output
			$("#out_final_level").val(final_level);
			$("#out_final_exp").val(final_leftover_exp_to_next_lv);
			
			$("#out_final_level_great").val(final_level_great);
			$("#out_final_exp_great").val(final_leftover_exp_to_next_lv_great);
			
			$("#out_final_level_super").val(final_level_super);
			$("#out_final_exp_super").val(final_leftover_exp_to_next_lv_super);
		}
	}
}

function change_max_lv()
{
	var max_lv = "";
	switch($("#exp_table").val())
	{
		case "1": max_lv = "100"; break;
		case "2": max_lv = "80"; break;
		case "3": max_lv = "100"; break;
		default: max_lv = "???";
	}
	$("#max_lv").text(max_lv);
	$("#current_lv").attr("max",max_lv);
	$("#target_lv").attr("max",max_lv);
}

function change_selection()
{
	$("#calc_selection_1").hide();
	$("#calc_selection_2").hide();
	switch($("#calc_selection").val())
	{
		case "1": $("#calc_selection_1").show(); break;
		case "2": $("#calc_selection_2").show(); break;
	}
}

function check_checkbox()
{
	if($('#exp_to_next_lv_check').is(':checked')) {
		$("#exp_to_next_lv").removeAttr("disabled");
		count_remaining_exp = true;
	}
	else
	{
		$("#exp_to_next_lv").attr("disabled","disabled");
		count_remaining_exp = false;
	}
}

function init_exp_table()
{
	// EXP Table 1
	exp_table_1[1] = 0;
	exp_table_1[2] = 10;
	exp_table_1[3] = 58;
	exp_table_1[4] = 160;
	exp_table_1[5] = 329;
	exp_table_1[6] = 574;
	exp_table_1[7] = 905;
	exp_table_1[8] = 1330;
	exp_table_1[9] = 1857;
	exp_table_1[10] = 2493;
	exp_table_1[11] = 3244;
	exp_table_1[12] = 4116;
	exp_table_1[13] = 5117;
	exp_table_1[14] = 6250;
	exp_table_1[15] = 7522;
	exp_table_1[16] = 8939;
	exp_table_1[17] = 10504;
	exp_table_1[18] = 12222;
	exp_table_1[19] = 14099;
	exp_table_1[20] = 16140;
	exp_table_1[21] = 18346;
	exp_table_1[22] = 20726;
	exp_table_1[23] = 23282;
	exp_table_1[24] = 26019;
	exp_table_1[25] = 28940;
	exp_table_1[26] = 32049;
	exp_table_1[27] = 35350;
	exp_table_1[28] = 38847;
	exp_table_1[29] = 42544;
	exp_table_1[30] = 46446;
	exp_table_1[31] = 50554;
	exp_table_1[32] = 54873;
	exp_table_1[33] = 59405;
	exp_table_1[34] = 64154;
	exp_table_1[35] = 69126;
	exp_table_1[36] = 74321;
	exp_table_1[37] = 79744;
	exp_table_1[38] = 85397;
	exp_table_1[39] = 91284;
	exp_table_1[40] = 97408;
	exp_table_1[41] = 103772;
	exp_table_1[42] = 110380;
	exp_table_1[43] = 117234;
	exp_table_1[44] = 124337;
	exp_table_1[45] = 131692;
	exp_table_1[46] = 139302;
	exp_table_1[47] = 147170;
	exp_table_1[48] = 155299;
	exp_table_1[49] = 163692;
	exp_table_1[50] = 172352;
	exp_table_1[51] = 181280;
	exp_table_1[52] = 190480;
	exp_table_1[53] = 199555;
	exp_table_1[54] = 209707;
	exp_table_1[55] = 219739;
	exp_table_1[56] = 230054;
	exp_table_1[57] = 240654;
	exp_table_1[58] = 251542;
	exp_table_1[59] = 262720;
	exp_table_1[60] = 274191;
	exp_table_1[61] = 285957;
	exp_table_1[62] = 298021;
	exp_table_1[63] = 310385;
	exp_table_1[64] = 323052;
	exp_table_1[65] = 336024;
	exp_table_1[66] = 349304;
	exp_table_1[67] = 362894;
	exp_table_1[68] = 376796;
	exp_table_1[69] = 391013;
	exp_table_1[70] = 405547;
	exp_table_1[71] = 420401;
	exp_table_1[72] = 435576;
	exp_table_1[73] = 451075;
	exp_table_1[74] = 466901;
	exp_table_1[75] = 483055;
	exp_table_1[76] = 499540;
	exp_table_1[77] = 516358;
	exp_table_1[78] = 533511;
	exp_table_1[79] = 551002;
	exp_table_1[80] = 568832;
	exp_table_1[81] = 587004;
	exp_table_1[82] = 605520;
	exp_table_1[83] = 624382;
	exp_table_1[84] = 643592;
	exp_table_1[85] = 663153;
	exp_table_1[86] = 683066;
	exp_table_1[87] = 703334;
	exp_table_1[88] = 723958;
	exp_table_1[89] = 744941;
	exp_table_1[90] = 766285;
	exp_table_1[91] = 787991;
	exp_table_1[92] = 810062;
	exp_table_1[93] = 832500;
	exp_table_1[94] = 855307;
	exp_table_1[95] = 878485;
	exp_table_1[96] = 902036;
	exp_table_1[97] = 925961;
	exp_table_1[98] = 950263;
	exp_table_1[99] = 974944;
	exp_table_1[100] = 1000006;
	
	// EXP Table 2
	exp_table_2[1] = 0;
	exp_table_2[2] = 15;
	exp_table_2[3] = 87;
	exp_table_2[4] = 240;
	exp_table_2[5] = 492;
	exp_table_2[6] = 860;
	exp_table_2[7] = 1357;
	exp_table_2[8] = 1995;
	exp_table_2[9] = 2785;
	exp_table_2[10] = 3738;
	exp_table_2[11] = 4865;
	exp_table_2[12] = 6174;
	exp_table_2[13] = 7674;
	exp_table_2[14] = 9375;
	exp_table_2[15] = 11283;
	exp_table_2[16] = 13407;
	exp_table_2[17] = 15754;
	exp_table_2[18] = 18332;
	exp_table_2[19] = 21147;
	exp_table_2[20] = 24207;
	exp_table_2[21] = 27519;
	exp_table_2[22] = 31088;
	exp_table_2[23] = 34923;
	exp_table_2[24] = 39027;
	exp_table_2[25] = 43408;
	exp_table_2[26] = 48072;
	exp_table_2[27] = 53024;
	exp_table_2[28] = 58270;
	exp_table_2[29] = 63816;
	exp_table_2[30] = 69667;
	exp_table_2[31] = 75829;
	exp_table_2[32] = 82307;
	exp_table_2[33] = 89106;
	exp_table_2[34] = 96231;
	exp_table_2[35] = 103687;
	exp_table_2[36] = 111480;
	exp_table_2[37] = 119614;
	exp_table_2[38] = 128094;
	exp_table_2[39] = 136925;
	exp_table_2[40] = 146111;
	exp_table_2[41] = 155658;
	exp_table_2[42] = 165569;
	exp_table_2[43] = 175850;
	exp_table_2[44] = 186505;
	exp_table_2[45] = 197538;
	exp_table_2[46] = 208953;
	exp_table_2[47] = 220755;
	exp_table_2[48] = 232949;
	exp_table_2[49] = 245538;
	exp_table_2[50] = 258527;
	exp_table_2[51] = 271919;
	exp_table_2[52] = 285719;
	exp_table_2[53] = 299931;
	exp_table_2[54] = 314559;
	exp_table_2[55] = 329607;
	exp_table_2[56] = 345079;
	exp_table_2[57] = 360979;
	exp_table_2[58] = 377310;
	exp_table_2[59] = 394077;
	exp_table_2[60] = 411286;
	exp_table_2[61] = 428935;
	exp_table_2[62] = 447031;
	exp_table_2[63] = 465577;
	exp_table_2[64] = 484577;
	exp_table_2[65] = 504035;
	exp_table_2[66] = 523955;
	exp_table_2[67] = 544340;
	exp_table_2[68] = 565193;
	exp_table_2[69] = 586518;
	exp_table_2[70] = 608319;
	exp_table_2[71] = 630600;
	exp_table_2[72] = 653362;
	exp_table_2[73] = 676610;
	exp_table_2[74] = 700349;
	exp_table_2[75] = 724580;
	exp_table_2[76] = 749307;
	exp_table_2[77] = 774534;
	exp_table_2[78] = 800263;
	exp_table_2[79] = 826499;
	exp_table_2[80] = 853244;

	// EXP Table 3
	exp_table_3[1] = 0;
	exp_table_3[2] = 21;
	exp_table_3[3] = 117;
	exp_table_3[4] = 321;
	exp_table_3[5] = 658;
	exp_table_3[6] = 1148;
	exp_table_3[7] = 1810;
	exp_table_3[8] = 2660;
	exp_table_3[9] = 3714;
	exp_table_3[10] = 4985;
	exp_table_3[11] = 6488;
	exp_table_3[12] = 8233;
	exp_table_3[13] = 10234;
	exp_table_3[14] = 12501;
	exp_table_3[15] = 15045;
	exp_table_3[16] = 17877;
	exp_table_3[17] = 21006;
	exp_table_3[18] = 24444;
	exp_table_3[19] = 28198;
	exp_table_3[20] = 32279;
	exp_table_3[21] = 36694;
	exp_table_3[22] = 41453;
	exp_table_3[23] = 46565;
	exp_table_3[24] = 52037;
	exp_table_3[25] = 57878;
	exp_table_3[26] = 64096;
	exp_table_3[27] = 70699;
	exp_table_3[28] = 77694;
	exp_table_3[29] = 85088;
	exp_table_3[30] = 92889;
	exp_table_3[31] = 101104;
	exp_table_3[32] = 109741;
	exp_table_3[33] = 118806;
	exp_table_3[34] = 128306;
	exp_table_3[35] = 138248;
	exp_table_3[36] = 148638;
	exp_table_3[37] = 159483;
	exp_table_3[38] = 170790;
	exp_table_3[39] = 182564;
	exp_table_3[40] = 194812;
	exp_table_3[41] = 207541;
	exp_table_3[42] = 220756;
	exp_table_3[43] = 234464;
	exp_table_3[44] = 248670;
	exp_table_3[45] = 263380;
	exp_table_3[46] = 278600;
	exp_table_3[47] = 294336;
	exp_table_3[48] = 310594;
	exp_table_3[49] = 327379;
	exp_table_3[50] = 344697;
	exp_table_3[51] = 362553;
	exp_table_3[52] = 380953;
	exp_table_3[53] = 399903;
	exp_table_3[54] = 419407;
	exp_table_3[55] = 439471;
	exp_table_3[56] = 460100;
	exp_table_3[57] = 481300;
	exp_table_3[58] = 503075;
	exp_table_3[59] = 525431;
	exp_table_3[60] = 548372;
	exp_table_3[61] = 571904;
	exp_table_3[62] = 596032;
	exp_table_3[63] = 620761;
	exp_table_3[64] = 646095;
	exp_table_3[65] = 672040;
	exp_table_3[66] = 698600;
	exp_table_3[67] = 725780;
	exp_table_3[68] = 753585;
	exp_table_3[69] = 782019;
	exp_table_3[70] = 811087;
	exp_table_3[71] = 840794;
	exp_table_3[72] = 871145;
	exp_table_3[73] = 902144;
	exp_table_3[74] = 933795;
	exp_table_3[75] = 966103;
	exp_table_3[76] = 999073;
	exp_table_3[77] = 1032709;
	exp_table_3[78] = 1067016;
	exp_table_3[79] = 1101997;
	exp_table_3[80] = 1137658;
	exp_table_3[81] = 1174002;
	exp_table_3[82] = 1211034;
	exp_table_3[83] = 1248758;
	exp_table_3[84] = 1287179;
	exp_table_3[85] = 1326300;
	exp_table_3[86] = 1366126;
	exp_table_3[87] = 1406661;
	exp_table_3[88] = 1447909;
	exp_table_3[89] = 1489875;
	exp_table_3[90] = 1532562;
	exp_table_3[91] = 1575975;
	exp_table_3[92] = 1620117;
	exp_table_3[93] = 1664993;
	exp_table_3[94] = 1710607;
	exp_table_3[95] = 1756962;
	exp_table_3[96] = 1804063;
	exp_table_3[97] = 1851914;
	exp_table_3[98] = 1900518;
	exp_table_3[99] = 1949880;
	exp_table_3[100] = 2000006;
}


$(document).ready(function() {
	init_exp_table();
	check_checkbox();
	change_max_lv();
	change_selection();
});