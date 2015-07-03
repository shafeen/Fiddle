#include "FractionatedMorse.h"
#include <vector>
#include <cassert>

using namespace std;


FractionatedMorse::FractionatedMorse()
{
	// default mode is decrypt mode
	this->setMode_Decrypt();
}


std::vector<char> FractionatedMorse::inputFeed(std::vector<char> input) const
{
	if(encryptORdecrypt == false) // encrypt mode
	{

	}
	else // decrypt mode
	{

	}
}



std::vector<char> FractionatedMorse::decryptThisInput(std::vector<char> input) const
{

}


std::vector<char> FractionatedMorse::encryptThisInput(std::vector<char> input) const
{

}



// int main()
// {	
// 	bool thisIsTrue;
// 	assert(thisIsTrue = false);
// 	return 0;
// }