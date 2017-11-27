#include <iostream>
#include <fstream>

//#include "functions.h"
#include "program.h"

using namespace std;

int main(){
    ifstream ifs("in.txt");
    ofstream ofs("out.txt");

    Program P(ifs,ofs);

    return 0;
}
