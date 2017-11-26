#include <iostream>

#include "functions.h"

using namespace std;

int main(int argc, char *argv[]){
    if(argc==4){
        double x1 = atof(argv[1]);
        double x2 = atof(argv[2]);
        double t = atof(argv[3]);

        cout<<f(x1,x2,t)<<endl;
    }

    return 0;
}
