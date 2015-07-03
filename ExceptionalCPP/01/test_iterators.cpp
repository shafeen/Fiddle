#include <iterator>
#include <iostream>

using namespace std;


int main()
{

	uint a, b;
	ostream_iterator<uint> output(cout, " "); 
	
	cout << "Insert 2 numbers :";
	
	istream_iterator<uint> input(cin);
	a = *input++;
	b = *input;

	cout << "You Entered : ";
	*output++ = a;
	*output = b; 
	cout << endl;



	return 0;
}