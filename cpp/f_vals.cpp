#include <iostream>

#include "functions.h"

using namespace std;

int main(int argc, char *argv[]){
    if(argc>2){
        int n = atoi(argv[1]);

        for(int i=0; i<n; ++i){
            double x1 = atof(argv[3*i+2]);
            double x2 = atof(argv[3*i+3]);
            double t = atof(argv[3*i+4]);

            cout<<funcs::f(x1,x2,t)<<endl;
        };
    }

    return 0;
}
