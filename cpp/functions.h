#ifndef MMCORE_FUNCTIONS_H
#define MMCORE_FUNCTIONS_H

#include "math.h"

double f(double, double, double);
double u(double, double, double);
double L(double (*f)(double, double, double),double, double, double);
double G(double, double, double);

double f(double x1, double x2, double t){
    return t*t-x1*x1*x1+x2*x2;
}

double u(double x1, double x2, double t){
    return L(f,x1,x2,t);
}

double L(double (*f)(double, double, double), double x1, double x2, double t){
    double eps = 0.00001;
    double r_eps = 1./eps;
    double f_t = f(x1,x2,t-eps);
    double ftt = f(x1,x2,t+eps);
    double fs = f(x1,x2,t);

    double f_x1 = f(x1-eps,x2,t);
    double fxx1 = f(x1+eps,x2,t);

    double f_x2 = f(x1,x2-eps,t);
    double fxx2 = f(x1,x2+eps,t);

    return r_eps*r_eps*(ftt+f_t-2*fs-M_E*M_E*(fxx1+f_x1-2*fs+fxx2+f_x2-2*fs));
}

double G(double dx1, double dx2, double dt){
    double r = sqrt(dx1*dx1+dx2*dx2);
    if(M_E*dt-r<0.){
        return 0.;
    }
    return 1./(2.*M_PI*M_E*(M_E*M_E*dt*dt-r*r));
}

#endif //MMCORE_FUNCTIONS_H
