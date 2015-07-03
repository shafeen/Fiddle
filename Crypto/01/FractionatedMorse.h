#ifndef _FRACTIONATED_MORSE_H_
#define _FRACTIONATED_MORSE_H_

#include <vector>
#include <exception>

class FractionatedMorse 
{
private:
	bool encryptORdecrypt;


public:
	FractionatedMorse();



	// SETS MODE TO ENCRYPT OR DECRYPT MODE
	void setMode_Encrypt() {encryptORdecrypt = false;}
	void setMode_Decrypt() {encryptORdecrypt = true; }


	// RETURNS CURRENT MODE (encrypt = 0/false , decrypt = 1/true)
	bool getCurrentMode() const {return encryptORdecrypt;}


	// TAKES IN A vector<char> AS INPUT AND SPITS OUT 
	// ENCRYPTED OR DECRYPTED vector<char> OUTPUT 
	// DEPENDING ON WHAT THE CURRENT MODE IS SET TO. 
	// WILL THROW A runtime_error() IF UNEXPECTED INPUT
	// IS ENCOUNTERED. MAKE SURE THE CORRECT MODE IS SET!
	std::vector<char> inputFeed(std::vector<char> input) const;

	// SIMILAR TO FUNCTION inputFeed() EXCEPT IT PRINTS
	// THE OUTPUT DATA TO THE STD CONSOLE OUTPUT STREAM
	FractionatedMorse& operator<<(std::vector<char> input) const;
	FractionatedMorse& operator<<(const char* str) const;


	// TAKES IN A vector<char> AS INPUT AND SPITS OUT 
	// **DECRYPTED** vector<char> OUTPUT ONLY!!! 
	// MODE SETTING IS NOT TAKEN INTO ACCOUNT -> CAREFUL!
	// THROWS runtime_error() ON UNEXPECTED INPUT
	std::vector<char> decryptThisInput(std::vector<char> input) const;


	// TAKES IN A vector<char> AS INPUT AND SPITS OUT 
	// **ENCRYPTED** vector<char> OUTPUT ONLY!!! 
	// MODE SETTING IS NOT TAKEN INTO ACCOUNT -> CAREFUL!
	// THROWS runtime_error() ON UNEXPECTED INPUT
	std::vector<char> encryptThisInput(std::vector<char> input) const;


};






#endif // _FRACTIONATED_MORSE_H_