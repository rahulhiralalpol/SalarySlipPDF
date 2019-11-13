// Import required libraries
var PDFDocument = require("pdfkit");
var fs = require("fs");
var SVGtoPDF = require("svg-to-pdfkit");
var xlsx = require("xlsx");

// Define workbook from which the data needs to be extracted and parse it to json
var workbook = xlsx.readFile(
  "./Salary Slip Data - Structure.xlsx"
);
var sheet_name_list = workbook.SheetNames;
var rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

///Define required SVG Documents
var svgfile = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- Generator: Gravit.io --><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 99.39 31.181" width="99.39pt" height="31.181pt"><clipPath id="_clipPath_dW6A752u7rQRebSLK6ItoALH1hB9d0qg"><rect x="0" y="0" width="99.39" height="31.181" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_dW6A752u7rQRebSLK6ItoALH1hB9d0qg)"><path d=" M 72.359 3.627 C 73.273 3.627 74.067 4.611 74.465 6.052 C 75.907 6.45 76.89 7.244 76.89 8.158 C 76.89 9.073 75.907 9.866 74.465 10.264 C 74.067 11.706 73.273 12.689 72.359 12.689 C 71.445 12.689 70.651 11.706 70.253 10.264 C 68.811 9.866 67.828 9.073 67.828 8.158 C 67.828 7.244 68.811 6.45 70.253 6.052 C 70.651 4.611 71.445 3.627 72.359 3.627 Z " fill-rule="evenodd" fill="rgb(251,49,153)"/><path d=" M 11.153 0.428 C 15.419 0.428 19.102 2.922 20.83 6.534 L 19.085 6.534 C 17.492 3.805 14.537 1.971 11.153 1.971 C 6.082 1.971 1.971 6.089 1.971 11.169 C 1.971 16.249 6.082 20.367 11.153 20.367 C 16.033 20.367 20.022 16.554 20.317 11.741 L 16.444 11.741 L 16.444 10.198 L 20.284 10.198 L 20.284 10.197 L 21.834 10.197 L 21.834 10.198 L 21.849 10.198 L 21.849 10.389 C 21.868 10.647 21.878 10.907 21.878 11.169 C 21.878 17.101 17.076 21.91 11.153 21.91 C 5.23 21.91 0.428 17.101 0.428 11.169 C 0.428 5.237 5.23 0.428 11.153 0.428 Z " fill-rule="evenodd" fill="rgb(6,6,12)"/><path d=" M 33.381 16.114 L 33.381 16.794 L 33.381 16.794 L 33.381 19.137 L 33.381 19.146 L 33.381 19.164 L 33.381 19.173 L 33.381 19.191 L 33.382 19.191 C 33.399 19.685 33.76 20.091 34.232 20.173 L 34.232 21.725 C 33.109 21.649 32.183 20.848 31.917 19.785 C 30.866 20.958 29.341 21.695 27.645 21.695 C 24.475 21.695 21.905 19.121 21.905 15.946 C 21.905 12.771 24.475 10.197 27.645 10.197 C 30.814 10.197 33.384 12.771 33.384 15.946 C 33.384 16.002 33.383 16.058 33.381 16.114 Z  M 27.645 11.739 C 29.962 11.739 31.841 13.623 31.841 15.946 C 31.841 18.27 29.962 20.153 27.645 20.153 C 25.327 20.153 23.448 18.27 23.448 15.946 C 23.448 13.623 25.327 11.739 27.645 11.739 Z " fill-rule="evenodd" fill="rgb(6,6,12)"/><path d=" M 70.7 16.114 L 70.7 16.794 L 70.7 16.794 L 70.7 19.137 L 70.7 19.146 L 70.7 19.164 L 70.7 19.173 L 70.7 19.191 L 70.701 19.191 C 70.717 19.685 71.079 20.091 71.551 20.173 L 71.551 21.725 C 70.427 21.649 69.502 20.848 69.235 19.785 C 68.185 20.958 66.66 21.695 64.963 21.695 C 61.794 21.695 59.224 19.121 59.224 15.946 C 59.224 12.771 61.794 10.197 64.963 10.197 C 68.133 10.197 70.703 12.771 70.703 15.946 C 70.703 16.002 70.702 16.058 70.7 16.114 Z  M 64.963 11.739 C 67.281 11.739 69.16 13.623 69.16 15.946 C 69.16 18.27 67.281 20.153 64.963 20.153 C 62.646 20.153 60.767 18.27 60.767 15.946 C 60.767 13.623 62.646 11.739 64.963 11.739 Z " fill-rule="evenodd" fill="rgb(6,6,12)"/><path d=" M 40.736 10.197 C 43.706 10.197 46.148 12.456 46.445 15.352 L 46.445 15.352 L 46.445 15.946 L 46.445 21.694 L 44.903 21.694 L 44.903 15.439 C 44.653 13.355 42.883 11.739 40.736 11.739 C 38.591 11.739 36.822 13.353 36.57 15.436 L 36.57 15.821 L 36.57 21.694 L 35.028 21.694 L 35.028 15.946 L 35.028 15.821 L 35.028 15.352 L 35.027 15.352 L 35.028 15.347 L 35.028 15.134 L 35.028 15.134 L 35.028 12.79 L 35.028 12.781 L 35.028 12.763 L 35.028 12.754 L 35.028 12.736 L 35.027 12.736 C 35.01 12.236 34.64 11.827 34.159 11.752 L 34.159 10.202 C 35.273 10.27 36.194 11.048 36.479 12.091 C 37.529 10.928 39.047 10.197 40.736 10.197 Z " fill-rule="evenodd" fill="rgb(6,6,12)"/><path d=" M 52.785 10.197 C 54.487 10.197 56.016 10.939 57.067 12.118 C 57.345 11.052 58.287 10.257 59.423 10.2 L 59.423 11.747 C 58.928 11.81 58.543 12.226 58.526 12.736 L 58.525 12.736 L 58.525 12.754 L 58.525 12.763 L 58.525 12.781 L 58.525 12.79 L 58.525 15.134 L 58.525 15.134 L 58.525 15.821 L 58.523 15.821 C 58.524 15.863 58.525 15.905 58.525 15.946 C 58.525 19.121 55.955 21.695 52.785 21.695 C 49.616 21.695 47.046 19.121 47.046 15.946 C 47.046 12.771 49.616 10.197 52.785 10.197 Z  M 58.525 25.004 C 58.525 28.179 55.955 30.753 52.785 30.753 C 49.616 30.753 47.046 28.179 47.046 25.004 L 48.589 25.004 C 48.589 27.327 50.468 29.21 52.785 29.21 C 55.103 29.21 56.982 27.327 56.982 25.004 L 56.982 25.004 L 56.982 20.727 C 57.625 20.161 58.152 19.466 58.525 18.684 L 58.525 25.004 L 58.525 25.004 Z  M 52.785 11.739 C 55.103 11.739 56.982 13.623 56.982 15.946 C 56.982 18.27 55.103 20.153 52.785 20.153 C 50.468 20.153 48.589 18.27 48.589 15.946 C 48.589 13.623 50.468 11.739 52.785 11.739 Z " fill-rule="evenodd" fill="rgb(6,6,12)"/><path d=" M 77.982 1.833 C 77.982 1.871 77.98 1.903 77.976 1.93 C 77.971 1.957 77.964 1.98 77.954 1.997 C 77.944 2.013 77.933 2.026 77.918 2.033 C 77.903 2.041 77.887 2.045 77.87 2.045 L 76.666 2.045 L 76.666 5.362 C 76.666 5.378 76.661 5.391 76.652 5.403 C 76.643 5.415 76.629 5.424 76.606 5.431 C 76.584 5.438 76.555 5.444 76.519 5.449 C 76.482 5.454 76.436 5.456 76.381 5.456 C 76.328 5.456 76.283 5.454 76.245 5.449 C 76.208 5.444 76.177 5.438 76.156 5.431 C 76.133 5.424 76.119 5.415 76.109 5.403 C 76.1 5.391 76.096 5.378 76.096 5.362 L 76.096 2.045 L 74.891 2.045 C 74.874 2.045 74.859 2.041 74.844 2.033 C 74.829 2.026 74.818 2.013 74.809 1.997 C 74.801 1.98 74.793 1.957 74.787 1.93 C 74.782 1.903 74.779 1.871 74.779 1.833 C 74.779 1.796 74.782 1.763 74.787 1.735 C 74.793 1.706 74.801 1.683 74.809 1.666 C 74.818 1.648 74.829 1.635 74.844 1.628 C 74.859 1.62 74.874 1.616 74.891 1.616 L 77.87 1.616 C 77.887 1.616 77.903 1.62 77.918 1.628 C 77.933 1.635 77.944 1.648 77.954 1.666 C 77.964 1.683 77.971 1.706 77.976 1.735 C 77.98 1.763 77.982 1.796 77.982 1.833 Z " fill="rgb(6,6,12)"/><path d=" M 82.102 5.362 C 82.102 5.378 82.098 5.392 82.091 5.403 C 82.083 5.415 82.07 5.424 82.052 5.431 C 82.033 5.438 82.008 5.444 81.979 5.449 C 81.95 5.454 81.912 5.456 81.865 5.456 C 81.821 5.456 81.784 5.454 81.753 5.449 C 81.722 5.444 81.697 5.438 81.679 5.431 C 81.662 5.424 81.649 5.415 81.641 5.403 C 81.634 5.392 81.63 5.378 81.63 5.362 L 81.63 2.032 L 81.624 2.032 L 80.373 5.377 C 80.369 5.391 80.36 5.402 80.351 5.412 C 80.34 5.422 80.325 5.43 80.307 5.437 C 80.287 5.444 80.264 5.449 80.237 5.452 C 80.211 5.455 80.179 5.456 80.143 5.456 C 80.104 5.456 80.072 5.454 80.044 5.45 C 80.017 5.446 79.994 5.441 79.976 5.434 C 79.957 5.427 79.943 5.419 79.933 5.409 C 79.923 5.399 79.916 5.389 79.912 5.377 L 78.715 2.032 L 78.712 2.032 L 78.712 5.362 C 78.712 5.378 78.708 5.392 78.701 5.403 C 78.693 5.415 78.68 5.424 78.661 5.431 C 78.643 5.438 78.617 5.444 78.587 5.449 C 78.557 5.454 78.519 5.456 78.472 5.456 C 78.426 5.456 78.389 5.454 78.359 5.449 C 78.329 5.444 78.304 5.438 78.286 5.431 C 78.269 5.424 78.257 5.415 78.25 5.403 C 78.243 5.392 78.24 5.378 78.24 5.362 L 78.24 1.846 C 78.24 1.763 78.26 1.704 78.3 1.669 C 78.342 1.634 78.388 1.616 78.437 1.616 L 78.728 1.616 C 78.787 1.616 78.839 1.622 78.883 1.634 C 78.928 1.645 78.967 1.664 79 1.689 C 79.034 1.715 79.062 1.748 79.084 1.787 C 79.106 1.826 79.126 1.873 79.143 1.926 L 80.16 4.694 L 80.174 4.694 L 81.229 1.934 C 81.249 1.876 81.272 1.825 81.296 1.784 C 81.321 1.743 81.347 1.709 81.376 1.685 C 81.404 1.66 81.437 1.643 81.471 1.632 C 81.507 1.621 81.548 1.616 81.594 1.616 L 81.899 1.616 C 81.926 1.616 81.953 1.62 81.978 1.629 C 82.003 1.638 82.024 1.652 82.042 1.67 C 82.06 1.689 82.074 1.712 82.085 1.742 C 82.096 1.77 82.102 1.805 82.102 1.846 L 82.102 5.362 Z " fill="rgb(6,6,12)"/><path d=" M 62.17 30.657 L 62.17 24.967 L 66.279 24.967 L 66.279 25.635 L 62.925 25.635 L 62.925 27.383 L 66.064 27.383 L 66.064 28.051 L 62.925 28.051 L 62.925 29.99 L 66.414 29.99 L 66.414 30.657 L 62.17 30.657 Z  M 66.877 30.657 L 69.076 27.705 L 67.14 24.967 L 68.036 24.967 L 69.073 26.423 C 69.289 26.725 69.439 26.955 69.525 27.116 C 69.653 26.917 69.805 26.705 69.978 26.481 L 71.114 24.967 L 71.94 24.967 L 69.963 27.672 L 72.09 30.657 L 71.166 30.657 L 69.73 28.628 C 69.648 28.513 69.57 28.398 69.497 28.284 C 69.37 28.474 69.28 28.608 69.224 28.684 L 67.782 30.657 L 66.877 30.657 Z  M 72.755 30.657 L 72.755 24.967 L 74.904 24.967 C 75.281 24.967 75.57 24.986 75.77 25.022 C 76.049 25.068 76.284 25.157 76.473 25.287 C 76.662 25.418 76.815 25.6 76.93 25.835 C 77.045 26.069 77.102 26.328 77.102 26.61 C 77.102 27.092 76.948 27.501 76.64 27.835 C 76.333 28.17 75.775 28.337 74.97 28.337 L 73.51 28.337 L 73.51 30.657 L 72.755 30.657 Z  M 73.51 27.669 L 74.98 27.669 C 75.468 27.669 75.812 27.579 76.017 27.398 C 76.221 27.216 76.323 26.962 76.323 26.632 C 76.323 26.395 76.264 26.191 76.143 26.022 C 76.023 25.852 75.864 25.74 75.668 25.685 C 75.541 25.652 75.306 25.635 74.966 25.635 L 73.51 25.635 L 73.51 27.669 Z  M 77.825 27.888 C 77.825 26.945 78.079 26.206 78.587 25.672 C 79.094 25.138 79.748 24.872 80.551 24.872 C 81.077 24.872 81.55 24.998 81.972 25.248 C 82.393 25.498 82.715 25.848 82.936 26.297 C 83.158 26.745 83.269 27.253 83.269 27.822 C 83.269 28.398 83.152 28.914 82.919 29.369 C 82.686 29.824 82.356 30.168 81.93 30.402 C 81.502 30.636 81.041 30.753 80.547 30.753 C 80.01 30.753 79.532 30.623 79.11 30.364 C 78.689 30.106 78.368 29.754 78.151 29.306 C 77.934 28.86 77.825 28.387 77.825 27.888 Z  M 78.604 27.901 C 78.604 28.586 78.788 29.125 79.156 29.518 C 79.525 29.911 79.987 30.109 80.543 30.109 C 81.11 30.109 81.575 29.91 81.942 29.513 C 82.307 29.116 82.49 28.551 82.49 27.82 C 82.49 27.358 82.412 26.954 82.255 26.61 C 82.099 26.265 81.87 25.998 81.569 25.808 C 81.267 25.619 80.93 25.524 80.555 25.524 C 80.023 25.524 79.564 25.706 79.18 26.072 C 78.796 26.438 78.604 27.047 78.604 27.901 Z  M 84.253 30.657 L 84.253 24.967 L 86.775 24.967 C 87.282 24.967 87.667 25.019 87.931 25.121 C 88.194 25.223 88.405 25.403 88.562 25.661 C 88.72 25.92 88.798 26.206 88.798 26.518 C 88.798 26.922 88.667 27.263 88.406 27.539 C 88.145 27.816 87.743 27.991 87.197 28.067 C 87.397 28.162 87.548 28.257 87.651 28.35 C 87.871 28.551 88.079 28.804 88.274 29.108 L 89.258 30.657 L 88.317 30.657 L 87.565 29.473 C 87.347 29.13 87.165 28.869 87.023 28.688 C 86.88 28.506 86.753 28.38 86.641 28.308 C 86.53 28.236 86.414 28.186 86.298 28.157 C 86.213 28.139 86.074 28.13 85.879 28.13 L 85.008 28.13 L 85.008 30.657 L 84.253 30.657 Z  M 85.008 27.479 L 86.624 27.479 C 86.968 27.479 87.235 27.443 87.429 27.371 C 87.622 27.301 87.769 27.187 87.868 27.03 C 87.969 26.873 88.019 26.704 88.019 26.52 C 88.019 26.251 87.923 26.028 87.728 25.855 C 87.533 25.681 87.226 25.595 86.806 25.595 L 85.008 25.595 L 85.008 27.479 Z  M 91.279 30.657 L 91.279 25.635 L 89.404 25.635 L 89.404 24.967 L 93.909 24.967 L 93.909 25.635 L 92.034 25.635 L 92.034 30.657 L 91.279 30.657 Z  M 94.44 28.83 L 95.148 28.766 C 95.181 29.052 95.259 29.286 95.382 29.47 C 95.505 29.653 95.696 29.802 95.954 29.915 C 96.212 30.028 96.504 30.085 96.827 30.085 C 97.114 30.085 97.367 30.043 97.587 29.957 C 97.807 29.871 97.97 29.753 98.077 29.603 C 98.185 29.453 98.239 29.29 98.239 29.116 C 98.239 28.938 98.187 28.783 98.084 28.649 C 97.98 28.517 97.81 28.406 97.571 28.314 C 97.419 28.256 97.081 28.163 96.558 28.037 C 96.035 27.912 95.669 27.794 95.46 27.683 C 95.189 27.539 94.987 27.362 94.855 27.151 C 94.721 26.941 94.655 26.704 94.655 26.443 C 94.655 26.154 94.737 25.885 94.9 25.636 C 95.063 25.386 95.3 25.197 95.614 25.067 C 95.926 24.937 96.275 24.872 96.658 24.872 C 97.079 24.872 97.451 24.94 97.773 25.076 C 98.094 25.211 98.342 25.411 98.516 25.676 C 98.689 25.939 98.782 26.239 98.795 26.573 L 98.072 26.628 C 98.033 26.269 97.902 25.998 97.679 25.815 C 97.455 25.631 97.124 25.54 96.687 25.54 C 96.231 25.54 95.899 25.623 95.691 25.79 C 95.483 25.957 95.378 26.158 95.378 26.394 C 95.378 26.598 95.452 26.766 95.599 26.898 C 95.745 27.03 96.122 27.166 96.734 27.304 C 97.346 27.443 97.766 27.563 97.994 27.667 C 98.324 27.819 98.569 28.011 98.726 28.245 C 98.884 28.479 98.962 28.747 98.962 29.052 C 98.962 29.355 98.876 29.639 98.702 29.906 C 98.529 30.174 98.281 30.382 97.957 30.53 C 97.632 30.678 97.268 30.753 96.861 30.753 C 96.348 30.753 95.917 30.677 95.57 30.527 C 95.222 30.378 94.95 30.153 94.753 29.851 C 94.554 29.55 94.451 29.21 94.44 28.83 Z " fill="rgb(6,6,12)"/></g></svg>`;
var vertsvg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 595.276 841.89" width="595.276pt" height="841.89pt"><defs><clipPath id="_clipPath_1MAanfJrecrpw81Pjyibbejj9fxogL7f"><rect width="595.276" height="841.89"/></clipPath></defs><g clip-path="url(#_clipPath_1MAanfJrecrpw81Pjyibbejj9fxogL7f)"><g><g><clipPath id="_clipPath_IQViBbyEU5cXOaolO0UutuguyM3iriHe"><rect x="0" y="0" width="345.45" height="117.64" transform="matrix(1,0,0,1,0,0)" fill="rgb(255,255,255)"/></clipPath><g clip-path="url(#_clipPath_IQViBbyEU5cXOaolO0UutuguyM3iriHe)"><g><path d=" M 7.28 2.26 C 7.512 2.6 7.622 3.009 7.59 3.42 C 7.625 3.913 7.483 4.402 7.19 4.8 C 6.912 5.126 6.498 5.304 6.07 5.28 L 6.07 6.76 C 6.574 6.771 7.068 6.62 7.48 6.33 C 7.896 6.019 8.221 5.601 8.42 5.12 C 8.655 4.584 8.775 4.005 8.77 3.42 C 8.812 2.631 8.59 1.85 8.14 1.2 C 7.74 0.667 7.106 0.361 6.44 0.38 C 6.038 0.373 5.641 0.473 5.29 0.67 C 4.934 0.887 4.639 1.19 4.43 1.55 C 4.132 2.05 3.903 2.588 3.75 3.15 C 3.625 3.656 3.419 4.139 3.14 4.58 C 2.968 4.843 2.674 5.001 2.36 5 C 2.021 5.023 1.693 4.873 1.49 4.6 C 1.267 4.267 1.158 3.87 1.18 3.47 C 1.151 3.039 1.287 2.614 1.56 2.28 C 1.819 2.004 2.182 1.852 2.56 1.86 L 2.56 0.39 C 2.08 0.385 1.61 0.525 1.21 0.79 C 0.823 1.066 0.519 1.443 0.33 1.88 C 0.104 2.379 -0.009 2.922 0 3.47 C -0.038 4.253 0.199 5.024 0.67 5.65 C 1.063 6.195 1.698 6.512 2.37 6.5 C 3.172 6.488 3.904 6.039 4.28 5.33 C 4.587 4.815 4.829 4.264 5 3.69 C 5.128 3.184 5.333 2.702 5.61 2.26 C 5.822 2 6.145 1.855 6.48 1.87 C 6.803 1.858 7.113 2.003 7.31 2.26 M 4.31 16.59 L 4.31 19.83 L 5.4 19.83 L 5.4 18.07 L 7.07 18.07 C 7.455 18.517 7.64 19.103 7.58 19.69 C 7.609 20.322 7.325 20.928 6.82 21.31 C 6.184 21.729 5.43 21.932 4.67 21.89 L 4 21.89 C 3.258 21.931 2.521 21.742 1.89 21.35 C 1.408 21.003 1.136 20.433 1.17 19.84 C 1.129 19.395 1.271 18.952 1.563 18.614 C 1.856 18.276 2.274 18.073 2.72 18.05 L 2.72 16.6 C 1.949 16.663 1.233 17.021 0.72 17.6 C 0.208 18.242 -0.048 19.05 0 19.87 C -0.052 20.852 0.35 21.803 1.09 22.45 C 1.945 23.111 3.011 23.441 4.09 23.38 L 4.75 23.38 C 5.483 23.385 6.208 23.224 6.87 22.91 C 7.447 22.631 7.93 22.19 8.26 21.64 C 8.59 21.062 8.759 20.406 8.75 19.74 C 8.759 19.102 8.65 18.468 8.43 17.87 C 8.254 17.366 7.938 16.922 7.52 16.59 L 4.31 16.59 Z  M 0.12 33.52 L 0.12 35 L 6.19 35 L 0.12 38.8 L 0.12 40.29 L 8.65 40.29 L 8.65 38.8 L 2.6 38.8 L 8.65 35 L 8.65 33.52 L 0.12 33.52 Z  M 0.12 52.22 L 8.65 52.22 L 8.65 50.75 L 0.12 50.75 L 0.12 52.22 Z  M 0.12 62.7 L 0.12 64.17 L 6.19 64.17 L 0.12 68 L 0.12 69.48 L 8.65 69.48 L 8.65 68 L 2.6 68 L 8.65 64.19 L 8.65 62.7 L 0.12 62.7 Z  M 1.31 84.11 L 1.31 82.55 C 1.287 82.125 1.426 81.706 1.7 81.38 C 1.985 81.111 2.369 80.973 2.76 81 C 3.141 80.987 3.507 81.145 3.76 81.43 C 4.033 81.756 4.169 82.176 4.14 82.6 L 4.14 84.12 L 1.31 84.11 Z  M 8.65 80.75 L 8.65 79.16 L 8.57 79.16 L 5 81.08 C 4.819 80.617 4.511 80.214 4.11 79.92 C 3.688 79.637 3.188 79.493 2.68 79.51 C 1.951 79.465 1.242 79.76 0.76 80.31 C 0.283 80.971 0.049 81.777 0.1 82.59 L 0.1 85.59 L 8.65 85.59 L 8.65 84.11 L 5.37 84.11 L 5.37 82.46 L 8.65 80.75 Z  M 1.93 99.09 L 5.47 97.86 L 5.47 100.33 L 1.93 99.09 Z  M 8.65 96.74 L 8.65 95.2 L 0.12 98.43 L 0.12 99.76 L 8.65 103 L 8.65 101.46 L 6.65 100.77 L 6.65 97.44 L 8.65 96.74 Z  M 3.65 112.65 L 3.65 116.16 L 1.31 116.16 L 1.31 112.1 L 0.12 112.1 L 0.12 117.64 L 8.65 117.64 L 8.65 112.06 L 7.46 112.06 L 7.46 116.16 L 4.84 116.16 L 4.84 112.65 L 3.65 112.65 Z " fill="rgb(35,31,32)"/><path d=" M 344 1.87 C 344.21 2.208 344.308 2.603 344.28 3 C 344.315 3.493 344.173 3.982 343.88 4.38 C 343.601 4.705 343.188 4.882 342.76 4.86 L 342.76 6.38 C 343.262 6.388 343.753 6.234 344.16 5.94 C 344.579 5.633 344.907 5.218 345.11 4.74 C 345.346 4.191 345.462 3.598 345.45 3 C 345.493 2.214 345.271 1.435 344.82 0.79 C 344.426 0.25 343.788 -0.058 343.12 -0.03 C 342.726 -0.027 342.34 0.08 342 0.28 C 341.639 0.498 341.34 0.804 341.13 1.17 C 340.839 1.669 340.614 2.203 340.46 2.76 C 340.335 3.266 340.129 3.749 339.85 4.19 C 339.681 4.459 339.388 4.625 339.07 4.63 C 338.733 4.643 338.41 4.494 338.2 4.23 C 337.974 3.898 337.865 3.501 337.89 3.1 C 337.858 2.666 337.994 2.237 338.27 1.9 C 338.529 1.624 338.892 1.472 339.27 1.48 L 339.27 0 C 338.818 0.011 338.377 0.15 338 0.4 C 337.566 0.661 337.219 1.043 337 1.5 C 336.775 1.999 336.666 2.543 336.68 3.09 C 336.645 3.871 336.878 4.64 337.34 5.27 C 337.739 5.807 338.371 6.12 339.04 6.11 C 339.862 6.121 340.619 5.668 341 4.94 C 341.307 4.429 341.539 3.877 341.69 3.3 C 341.82 2.797 342.029 2.317 342.31 1.88 C 342.521 1.629 342.832 1.484 343.16 1.484 C 343.488 1.484 343.799 1.629 344.01 1.88 M 336.84 12.88 L 336.84 14.36 L 342.92 14.36 L 336.84 18.17 L 336.84 19.6 L 345.37 19.6 L 345.37 18.12 L 339.32 18.12 L 345.37 14.32 L 345.37 12.83 L 336.84 12.88 Z  M 341.33 27.75 C 342.097 27.702 342.86 27.887 343.52 28.28 C 343.983 28.64 344.254 29.194 344.254 29.78 C 344.254 30.366 343.983 30.92 343.52 31.28 C 342.87 31.682 342.113 31.874 341.35 31.83 L 340.86 31.83 C 340.109 31.866 339.366 31.67 338.73 31.27 C 338.267 30.91 337.996 30.356 337.996 29.77 C 337.996 29.184 338.267 28.63 338.73 28.27 C 339.384 27.87 340.145 27.682 340.91 27.73 L 341.33 27.75 Z  M 340.86 26.27 C 340.105 26.253 339.357 26.407 338.67 26.72 C 338.076 26.978 337.573 27.41 337.23 27.96 C 336.563 29.103 336.563 30.517 337.23 31.66 C 337.588 32.207 338.095 32.64 338.69 32.91 C 339.386 33.214 340.14 33.364 340.9 33.35 L 341.38 33.35 C 342.124 33.354 342.86 33.201 343.54 32.9 C 344.134 32.636 344.635 32.2 344.98 31.65 C 345.66 30.507 345.66 29.083 344.98 27.94 C 344.63 27.392 344.126 26.961 343.53 26.7 C 342.837 26.398 342.086 26.252 341.33 26.27 L 340.86 26.27 Z  M 336.86 41.52 L 345.39 41.52 L 345.39 40 L 336.8 40 L 336.86 41.52 Z  M 336.86 47.87 L 336.86 54.63 L 338 54.63 L 338 52 L 345.33 52 L 345.33 50.48 L 338 50.48 L 338 47.82 L 336.86 47.87 Z  M 342.62 61.8 C 343.107 61.822 343.569 62.021 343.92 62.36 C 344.21 62.733 344.352 63.199 344.32 63.67 C 344.348 64.248 344.071 64.798 343.59 65.12 C 342.951 65.49 342.217 65.664 341.48 65.62 L 340.72 65.62 C 339.992 65.658 339.27 65.473 338.65 65.09 C 338.178 64.744 337.911 64.184 337.94 63.6 C 337.909 63.143 338.056 62.692 338.35 62.34 C 338.712 62.009 339.18 61.818 339.67 61.8 L 339.67 60.28 C 338.847 60.318 338.072 60.677 337.51 61.28 C 336.98 61.914 336.708 62.725 336.75 63.55 C 336.735 64.201 336.904 64.842 337.24 65.4 C 337.586 65.937 338.079 66.364 338.66 66.63 C 339.33 66.926 340.057 67.073 340.79 67.06 L 341.58 67.06 C 342.293 67.06 342.998 66.91 343.65 66.62 C 344.217 66.363 344.697 65.946 345.03 65.42 C 345.356 64.877 345.523 64.253 345.51 63.62 C 345.553 62.773 345.282 61.94 344.75 61.28 C 344.201 60.677 343.435 60.317 342.62 60.28 L 342.62 61.8 Z  M 336.8 75 L 342.46 75 C 343.67 75 344.27 75.57 344.27 76.71 C 344.305 77.178 344.142 77.639 343.82 77.98 C 343.458 78.293 342.988 78.451 342.51 78.42 L 336.8 78.42 L 336.8 79.89 L 342.5 79.89 C 343.315 79.937 344.109 79.622 344.67 79.03 C 345.717 77.661 345.717 75.759 344.67 74.39 C 344.112 73.798 343.323 73.48 342.51 73.52 L 336.81 73.52 L 336.8 75 Z  M 338 90.21 C 337.956 89.545 338.226 88.897 338.73 88.46 C 339.346 88.022 340.095 87.81 340.85 87.86 L 341.33 87.86 C 342.079 87.815 342.82 88.038 343.42 88.49 C 343.924 88.944 344.193 89.603 344.15 90.28 L 344.15 91.28 L 338 91.28 L 338 90.21 Z  M 345.33 90.28 C 345.338 89.583 345.169 88.895 344.84 88.28 C 344.513 87.69 344.019 87.21 343.42 86.9 C 342.756 86.569 342.022 86.405 341.28 86.42 L 340.86 86.42 C 340.125 86.405 339.397 86.57 338.74 86.9 C 338.14 87.199 337.643 87.669 337.31 88.25 C 336.968 88.861 336.792 89.55 336.8 90.25 L 336.8 92.77 L 345.33 92.77 L 345.33 90.28 Z  M 340.33 99.67 L 340.33 103.17 L 338 103.17 L 338 99.17 L 336.8 99.17 L 336.8 104.71 L 345.33 104.71 L 345.33 99.08 L 344.15 99.08 L 344.15 103.17 L 341.52 103.17 L 341.52 99.67 L 340.33 99.67 Z  M 338 115.12 C 337.954 114.454 338.225 113.806 338.73 113.37 C 339.343 112.924 340.094 112.708 340.85 112.76 L 341.33 112.76 C 342.081 112.718 342.822 112.945 343.42 113.4 C 343.924 113.854 344.193 114.513 344.15 115.19 L 344.15 116.19 L 338 116.19 L 338 115.12 Z  M 345.33 115.18 C 345.339 114.483 345.17 113.794 344.84 113.18 C 344.513 112.59 344.019 112.11 343.42 111.8 C 342.756 111.469 342.022 111.305 341.28 111.32 L 340.86 111.32 C 340.125 111.305 339.397 111.47 338.74 111.8 C 338.14 112.099 337.643 112.569 337.31 113.15 C 336.968 113.761 336.792 114.45 336.8 115.15 L 336.8 117.67 L 345.33 117.67 L 345.33 115.18 Z " fill="rgb(35,31,32)"/></g></g></g></g></g></svg>`;

///Create new PDF documents with given options
var doc = new PDFDocument({
  size: "A4",
  margin: 0,
  info: {
    Title: "Salary Slip",
    Author: "Rahul Pol",
    Subject: "Salary Slip",
    Keywords: "Salary Slip",
    Creator: "Ganga Exports"
  }
});

///Write stream to output PDF
doc.pipe(fs.createWriteStream("./Test.pdf"));

///Write data of each row to PDF document

var ypos = 0;

rows.forEach(function(item, index) {
  ypos = (index % 3) * 269.3;

  SVGtoPDF(doc, svgfile, 391.465, 37.751 + ypos);
  SVGtoPDF(doc, vertsvg, 35.501, 131.563 + ypos);

  doc
    .moveTo(24, 16.8 + ypos)
    .lineTo(41, 16.8 + ypos)
    .moveTo(554.2, 16.8 + ypos)
    .lineTo(571.2, 16.8 + ypos)
    .lineWidth(0.2)
    .stroke();

  doc
    .moveTo(49.11, 37.751 + ypos)
    .lineTo(49.11, 68.932 + ypos)
    .moveTo(49.11, 78.001 + ypos)
    .lineTo(49.11, 89.34 + ypos)
    .moveTo(49.11, 96.778 + ypos)
    .lineTo(49.11, 122.274 + ypos)
    .moveTo(49.11, 131.13 + ypos)
    .lineTo(49.11, 250.07 + ypos)
    .moveTo(385.795, 37.751 + ypos)
    .lineTo(385.795, 68.932 + ypos)
    .moveTo(385.795, 78.001 + ypos)
    .lineTo(385.795, 89.34 + ypos)
    .moveTo(385.795, 96.778 + ypos)
    .lineTo(385.795, 122.274 + ypos)
    .moveTo(385.795, 131.13 + ypos)
    .lineTo(385.795, 250.07 + ypos)
    .moveTo(262.063, 225.238 + ypos)
    .lineTo(262.063, 250.07 + ypos)
    .moveTo(348.094, 225.238 + ypos)
    .lineTo(348.094, 250.07 + ypos)
    .lineWidth(0.709)
    .stroke();

  doc
    .font("./Roboto Fonts/Roboto-Black.ttf")
    .fontSize(12)
    .text("SALARY SLIP", 55.155, 47.232 + ypos);
  doc
    .font("./Roboto Fonts/Roboto-Light.ttf")
    .fontSize(12)
    .text("for the month of", 134.977, 47.208 + ypos);
  doc
    .font("./Roboto Fonts/Roboto-Bold.ttf")
    .fontSize(12)
    .text(item.SAL_MONTH, 225.692, 47.232 + ypos); /// Month

  doc
    .font("./Roboto Fonts/Roboto-Light.ttf")
    .fontSize(10)
    .text("Employee Name", 55.678, 78.001 + ypos)
    .text(":", 131.722, 78.001 + ypos)
    .text("ESIC No.", 392.363, 78.001 + ypos)
    .text(":", 457.785, 78.001 + ypos)
    .text("EPF No.", 55.678, 97.169 + ypos)
    .text(":", 131.722, 97.169 + ypos)
    .text("Employee No.", 392.363, 97.169 + ypos)
    .text(":", 457.785, 97.169 + ypos)
    .text("UAN No.", 55.678, 111.326 + ypos)
    .text(":", 131.722, 111.326 + ypos)
    .text("Department", 392.363, 111.326 + ypos)
    .text(":", 457.785, 111.326 + ypos)
    .text("Basic", 55.678, 129.409 + ypos)
    .text(":    ₹", 170.659, 129.409 + ypos)
    .text("H.R.A.", 55.678, 141.659 + ypos)
    .text(":    ₹", 170.659, 141.659 + ypos)
    .text("Conveyance Allowance", 55.678, 153.426 + ypos)
    .text(":    ₹", 170.659, 153.426 + ypos)
    .text("Education Allowance", 55.678, 165.583 + ypos)
    .text(":    ₹", 170.659, 165.583 + ypos)
    .text("Bonus", 55.678, 178.131 + ypos)
    .text(":    ₹", 170.659, 178.131 + ypos)
    .text("Leave", 55.678, 190.289 + ypos)
    .text(":    ₹", 170.659, 190.289 + ypos)
    .text("Performance Allowance", 55.678, 201.953 + ypos)
    .text(":    ₹", 170.659, 201.953 + ypos)
    .text("Other Allowance", 55.678, 214.213 + ypos)
    .text(":    ₹", 170.659, 214.213 + ypos)
    .text("Provident Fund", 392.363, 129.409 + ypos)
    .text(":    ₹", 496.022, 129.409 + ypos)
    .text("E.S.I.C.", 392.363, 141.659 + ypos)
    .text(":    ₹", 496.022, 141.659 + ypos)
    .text("Professional Tax", 392.363, 153.426 + ypos)
    .text(":    ₹", 496.022, 153.426 + ypos)
    .text("L.W.F.", 392.363, 165.583 + ypos)
    .text(":    ₹", 496.022, 165.583 + ypos)
    .text("T.D.S.", 392.363, 178.131 + ypos)
    .text(":    ₹", 496.022, 178.131 + ypos)
    .text("Cash Advance", 392.363, 190.289 + ypos)
    .text(":    ₹", 496.022, 190.289 + ypos)
    .text("Cheque Advance", 392.363, 201.953 + ypos)
    .text(":    ₹", 496.022, 201.953 + ypos)
    .text("Loan", 392.363, 214.213 + ypos)
    .text(":    ₹", 496.022, 214.213 + ypos)
    .text("Other Deductions", 392.363, 225.972 + ypos)
    .text(":    ₹", 496.022, 225.972 + ypos);

  doc
    .font("./Roboto Fonts/Roboto-Regular.ttf")
    .fontSize(10)
    .text("GROSS SALARY", 55.678, 241.024 + ypos)
    .text(":    ₹", 170.659, 241.024 + ypos)
    .text("TOTAL DEDUCTIONS", 392.363, 241.024 + ypos)
    .text(":    ₹", 496.022, 241.024 + ypos);

  doc
    .font("./Roboto Fonts/Roboto-Bold.ttf")
    .fontSize(10)
    .text("NET SALARY", 262, 223.5 + ypos, { width: 86, align: "center" });

  doc
    .font("./Roboto Fonts/Roboto-Light.ttf")
    .fontSize(8)
    .text(
      "This is a computer generated Salary Slip and does not require a Signature.",
      170.338,
      255.877 + ypos
    );

  //Insert Values from DB//
  ///console.log("Id.: " + index + ", Sr: " + item["Sr."] + ", Date: " + item.Date + ", Amount: " + item.Amount;

  doc
    .font("./Roboto Fonts/Roboto-Medium.ttf")
    .fontSize(12)
    .text(item.EMP_NAME, 139.5, 77.001 + ypos, { width: 241, align: "left" }); ///Employee Name

  doc
    .font("./Roboto Fonts/Roboto-Regular.ttf")
    .fontSize(10)
    .text(item.ESIC_NUMBER, 465.5, 78.001 + ypos, {
      width: 96.8,
      align: "left"
    }) /// ESIC No.
    .text(item.PF_NUMBER, 139.5, 97.169 + ypos, { width: 241, align: "left" }) /// EPF No.
    .text(item.EMP_NO, 465.5, 97.169 + ypos, { width: 96.8, align: "left" }) /// Employee No.
    .text(item.UAN_NUMBER, 139.5, 111.326 + ypos, { width: 241, align: "left" }) /// UAN nO.
    .text(item.DEPT, 465.5, 111.326 + ypos, { width: 96.8, align: "left" }) /// Department
    .text(numberWithCommas(item.PAY_BASIC), 194, 129.409 + ypos, {
      width: 52,
      align: "right"
    }) /// Basic
    .text(numberWithCommas(item.PAY_HRA), 194, 141.659 + ypos, {
      width: 52,
      align: "right"
    }) /// H.R.A.
    .text(numberWithCommas(item.PAY_CON), 194, 153.426 + ypos, {
      width: 52,
      align: "right"
    }) /// Conveyance Allowance
    .text(numberWithCommas(item.PAY_EDU), 194, 165.583 + ypos, {
      width: 52,
      align: "right"
    }) /// Education Allowance
    .text(numberWithCommas(item.PAY_BONUS), 194, 178.131 + ypos, {
      width: 52,
      align: "right"
    }) /// Bonus
    .text(numberWithCommas(item.PAY_LEAVE), 194, 190.289 + ypos, {
      width: 52,
      align: "right"
    }) /// Leave
    .text(numberWithCommas(item.PERF_ALW), 194, 201.953 + ypos, {
      width: 52,
      align: "right"
    }) /// Performance Allowance
    .text(numberWithCommas(item.OTHER_ALW), 194, 214.409 + ypos, {
      width: 52,
      align: "right"
    }) /// Other Allowance
    .text(numberWithCommas(item.PF), 520, 129.409 + ypos, {
      width: 52,
      align: "right"
    }) /// Provident Fund
    .text(numberWithCommas(item.ESIC), 520, 141.659 + ypos, {
      width: 52,
      align: "right"
    }) /// E.S.I.C.
    .text(numberWithCommas(item.PT), 520, 153.426 + ypos, {
      width: 52,
      align: "right"
    }) /// Professional Tax
    .text(numberWithCommas(item.LWF), 520, 165.583 + ypos, {
      width: 52,
      align: "right"
    }) /// L.W.F.
    .text(numberWithCommas(item.TDS), 520, 178.131 + ypos, {
      width: 52,
      align: "right"
    }) /// T.D.S.
    .text(numberWithCommas(item.CASH_ADV), 520, 190.289 + ypos, {
      width: 52,
      align: "right"
    }) /// Cash Advance
    .text(numberWithCommas(item.CHEQUE), 520, 201.953 + ypos, {
      width: 52,
      align: "right"
    }) /// Cheque Advance
    .text(numberWithCommas(item.LOAN), 520, 214.409 + ypos, {
      width: 52,
      align: "right"
    }) /// Loan
    .text(numberWithCommas(item.OTHER_DED), 520, 225.972 + ypos, {
      width: 52,
      align: "right"
    }); /// Other Deductions

  doc
    .font("./Roboto Fonts/Roboto-Bold.ttf")
    .fontSize(10)
    .text(numberWithCommas(item.TOTAL_EARNINGS), 194, 241.024 + ypos, {
      width: 52,
      align: "right"
    }) /// Gross Salary
    .text(numberWithCommas(item.TOTAL_DED), 520, 241.024 + ypos, {
      width: 52,
      align: "right"
    }); /// Total Deductions

  doc
    .font("./Roboto Fonts/Roboto-Black.ttf")
    .fontSize(16)
    .text("₹ " + numberWithCommas(item.NET_PAYMENT), 262, 235.609 + ypos, {
      width: 86,
      align: "center"
    }); /// Net Salary

  if (index % 3 == 2) {
    doc
      .moveTo(24, 16.8 + 807.9)
      .lineTo(41, 16.8 + 807.9)
      .moveTo(554.2, 16.8 + 807.9)
      .lineTo(571.2, 16.8 + 807.9)
      .lineWidth(0.2)
      .stroke();
    doc.addPage();
  }
});

doc
  .moveTo(24, 16.8 + ypos + 269.3)
  .lineTo(41, 16.8 + ypos + 269.3)
  .moveTo(554.2, 16.8 + ypos + 269.3)
  .lineTo(571.2, 16.8 + ypos + 269.3)
  .lineWidth(0.2)
  .stroke();

doc.end();

function numberWithCommas(x) {
  x = String(x).toString();
  var afterPoint = "";
  if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
  x = Math.floor(x);
  x = x.toString();
  var lastThree = x.substring(x.length - 3);
  var otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  return (
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint
  );
}
