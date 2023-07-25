import * as React from "react";

interface Props {
  className?: string;
}

const CompanyLogo: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={className}
      width="75"
      height="47"
      viewBox="0 0 75 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M40.2833 0.818848H75V35.5355H40.2833V0.818848Z" fill="#300A4E" />
      <path
        d="M51.485 20.0104V27.1406H49.0625V20.0104L42.5067 9.24643H44.6296C44.846 9.24643 45.0167 9.30054 45.1415 9.40876C45.2664 9.50866 45.3746 9.64186 45.4662 9.80836L49.562 16.7637C49.7119 17.0551 49.8492 17.3298 49.9741 17.5879C50.099 17.8376 50.2072 18.0915 50.2988 18.3496C50.3903 18.0915 50.4944 17.8376 50.6109 17.5879C50.7275 17.3298 50.8565 17.0551 50.998 16.7637L55.0814 9.80836C55.1563 9.66683 55.2603 9.5378 55.3935 9.42125C55.5267 9.3047 55.6974 9.24643 55.9055 9.24643H58.0408L51.485 20.0104ZM72.4517 11.2818H66.6576V27.1406H64.2476V11.2818H58.441V9.24643H72.4517V11.2818Z"
        fill="#7921BF"
      />
      <path
        d="M11.3199 43.2735V45.1807H10.672V43.2735L8.91845 40.3944H9.48626C9.54415 40.3944 9.5898 40.4089 9.6232 40.4378C9.6566 40.4645 9.68555 40.5002 9.71004 40.5447L10.8056 42.4051C10.8457 42.483 10.8824 42.5565 10.9158 42.6255C10.9492 42.6923 10.9781 42.7602 11.0026 42.8293C11.0271 42.7602 11.055 42.6923 11.0861 42.6255C11.1173 42.5565 11.1518 42.483 11.1897 42.4051L12.2819 40.5447C12.3019 40.5068 12.3297 40.4723 12.3654 40.4411C12.401 40.41 12.4467 40.3944 12.5023 40.3944H13.0735L11.3199 43.2735ZM17.4002 43.4038L16.6487 41.4565C16.6265 41.3986 16.6031 41.3318 16.5786 41.2561C16.5541 41.1782 16.5307 41.0958 16.5084 41.009C16.4617 41.1893 16.4138 41.3396 16.3648 41.4599L15.6133 43.4038H17.4002ZM18.7496 45.1807H18.2486C18.1907 45.1807 18.1439 45.1662 18.1083 45.1372C18.0727 45.1083 18.046 45.0716 18.0282 45.027L17.5806 43.8714H15.4329L14.9854 45.027C14.972 45.0671 14.9464 45.1027 14.9086 45.1339C14.8707 45.1651 14.8239 45.1807 14.7683 45.1807H14.2673L16.1811 40.3944H16.8358L18.7496 45.1807ZM23.4641 41.1426C23.4441 41.176 23.4218 41.2016 23.3973 41.2194C23.3751 41.235 23.3472 41.2428 23.3138 41.2428C23.276 41.2428 23.2314 41.2238 23.1802 41.186C23.129 41.1481 23.0644 41.1069 22.9865 41.0624C22.9108 41.0156 22.8184 40.9733 22.7093 40.9355C22.6024 40.8976 22.4721 40.8787 22.3185 40.8787C22.1738 40.8787 22.0457 40.8987 21.9344 40.9388C21.8253 40.9767 21.7329 41.029 21.6572 41.0958C21.5837 41.1626 21.528 41.2416 21.4902 41.3329C21.4523 41.422 21.4334 41.5189 21.4334 41.6235C21.4334 41.7571 21.4657 41.8685 21.5302 41.9575C21.597 42.0444 21.6839 42.119 21.7908 42.1813C21.8999 42.2437 22.0223 42.2982 22.1582 42.345C22.2962 42.3895 22.4365 42.4363 22.579 42.4853C22.7237 42.5342 22.864 42.5899 22.9999 42.6523C23.1379 42.7124 23.2604 42.7892 23.3673 42.8827C23.4764 42.9762 23.5632 43.0909 23.6278 43.2267C23.6946 43.3626 23.728 43.5296 23.728 43.7277C23.728 43.9371 23.6924 44.1341 23.6211 44.3189C23.5499 44.5015 23.4452 44.6607 23.3071 44.7966C23.1713 44.9324 23.0032 45.0393 22.8028 45.1172C22.6046 45.1951 22.3786 45.2341 22.1248 45.2341C21.813 45.2341 21.5302 45.1784 21.2764 45.0671C21.0226 44.9535 20.8055 44.801 20.6251 44.6095L20.8121 44.3022C20.8299 44.2777 20.8511 44.2577 20.8756 44.2421C20.9023 44.2243 20.9313 44.2154 20.9624 44.2154C20.9914 44.2154 21.0237 44.2276 21.0593 44.2521C21.0971 44.2744 21.1395 44.3033 21.1862 44.339C21.233 44.3746 21.2864 44.4136 21.3465 44.4559C21.4067 44.4982 21.4746 44.5371 21.5503 44.5728C21.6282 44.6084 21.7162 44.6385 21.8141 44.663C21.9121 44.6852 22.0223 44.6964 22.1448 44.6964C22.2984 44.6964 22.4354 44.6752 22.5556 44.6329C22.6759 44.5906 22.7772 44.5316 22.8596 44.4559C22.9442 44.3779 23.0088 44.2855 23.0533 44.1787C23.0978 44.0718 23.1201 43.9526 23.1201 43.8213C23.1201 43.6765 23.0867 43.5585 23.0199 43.4672C22.9553 43.3737 22.8696 43.2958 22.7627 43.2334C22.6558 43.1711 22.5334 43.1187 22.3953 43.0764C22.2573 43.0319 22.117 42.9874 21.9745 42.9428C21.832 42.8961 21.6917 42.8426 21.5536 42.7825C21.4156 42.7224 21.2931 42.6445 21.1862 42.5487C21.0793 42.453 20.9925 42.3338 20.9257 42.1913C20.8611 42.0466 20.8288 41.8685 20.8288 41.6569C20.8288 41.4877 20.8611 41.324 20.9257 41.1659C20.9925 41.0078 21.0882 40.8676 21.2129 40.7451C21.3399 40.6226 21.4946 40.5246 21.6772 40.4512C21.862 40.3777 22.0736 40.3409 22.3118 40.3409C22.579 40.3409 22.8217 40.3833 23.0399 40.4679C23.2604 40.5525 23.4541 40.6749 23.6211 40.8353L23.4641 41.1426ZM30.1574 40.3944V45.1807H29.5094V43.003H26.9275V45.1807H26.2796V40.3944H26.9275V42.5287H29.5094V40.3944H30.1574ZM33.6655 45.1807H33.0176V40.3944H33.6655V45.1807Z"
        fill="#303030"
      />
      <path
        d="M46.311 40.9388H44.7612V45.1807H44.1166V40.9388H42.5635V40.3944H46.311V40.9388ZM51.6104 44.6529L51.6071 45.1807H48.6578V40.3944H51.6071V40.9221H49.3058V42.512H51.1695V43.0197H49.3058V44.6529H51.6104ZM57.4056 44.192C57.4412 44.192 57.4724 44.2065 57.4991 44.2354L57.7563 44.5127C57.5603 44.7398 57.3221 44.9168 57.0415 45.0437C56.7632 45.1706 56.4258 45.2341 56.0295 45.2341C55.6865 45.2341 55.3748 45.1751 55.0942 45.0571C54.8137 44.9368 54.5743 44.7698 54.3761 44.5561C54.178 44.3401 54.0243 44.0818 53.9152 43.7812C53.8061 43.4806 53.7516 43.1499 53.7516 42.7892C53.7516 42.4285 53.8083 42.0978 53.9219 41.7972C54.0355 41.4966 54.1947 41.2383 54.3995 41.0223C54.6066 40.8063 54.8538 40.6393 55.141 40.5213C55.4283 40.4011 55.7456 40.3409 56.0929 40.3409C56.4336 40.3409 56.7342 40.3955 56.9947 40.5046C57.2553 40.6137 57.4846 40.7618 57.6828 40.9488L57.469 41.2461C57.4557 41.2684 57.4378 41.2873 57.4156 41.3029C57.3955 41.3162 57.3677 41.3229 57.3321 41.3229C57.292 41.3229 57.243 41.3018 57.1851 41.2595C57.1272 41.2149 57.0515 41.1659 56.958 41.1125C56.8645 41.0591 56.7476 41.0112 56.6073 40.9689C56.467 40.9243 56.2944 40.9021 56.0896 40.9021C55.8424 40.9021 55.6164 40.9455 55.4116 41.0323C55.2067 41.1169 55.0297 41.2405 54.8805 41.4031C54.7335 41.5656 54.6188 41.7638 54.5365 41.9976C54.4541 42.2314 54.4129 42.4953 54.4129 42.7892C54.4129 43.0876 54.4552 43.3537 54.5398 43.5875C54.6266 43.8213 54.7435 44.0194 54.8905 44.182C55.0397 44.3423 55.2145 44.4648 55.4149 44.5494C55.6175 44.634 55.8357 44.6763 56.0695 44.6763C56.212 44.6763 56.3401 44.6685 56.4536 44.6529C56.5694 44.6351 56.6752 44.6084 56.7709 44.5728C56.8689 44.5371 56.9591 44.4926 57.0415 44.4392C57.1261 44.3835 57.2096 44.3178 57.292 44.2421C57.3298 44.2087 57.3677 44.192 57.4056 44.192ZM64.022 40.3944V45.1807H63.374V43.003H60.7921V45.1807H60.1442V40.3944H60.7921V42.5287H63.374V40.3944H64.022Z"
        fill="#303030"
      />
      <path
        d="M31.2859 0.991699C29.0827 0.991699 27.3201 2.75429 27.3201 4.95752C27.3201 7.16075 29.0827 8.92334 31.2859 8.92334C33.4891 8.92334 35.2517 7.16075 35.2517 4.95752C35.2517 2.75429 33.4891 0.991699 31.2859 0.991699ZM31.2859 8.04204C29.5674 8.04204 28.2014 6.67604 28.2014 4.95752C28.2014 3.239 29.5674 1.87299 31.2859 1.87299C33.0044 1.87299 34.3704 3.239 34.3704 4.95752C34.3704 6.67604 33.0044 8.04204 31.2859 8.04204Z"
        fill="#303030"
      />
      <path
        d="M31.2859 14.2111C30.1402 14.2111 29.1267 14.6958 28.3776 15.489L20.8426 7.29294C21.3273 6.63197 21.5917 5.83881 21.5917 4.95752C21.5917 2.75429 19.8291 0.991699 17.6259 0.991699C15.4226 0.991699 13.66 2.75429 13.66 4.95752C13.66 7.16075 15.4226 8.92334 17.6259 8.92334C18.6393 8.92334 19.5206 8.52675 20.2257 7.95391L27.8488 16.194C27.5404 16.7668 27.3201 17.4719 27.3201 18.1769C27.3201 20.3801 29.0827 22.1427 31.2859 22.1427C33.4891 22.1427 35.2517 20.3801 35.2517 18.1769C35.2517 15.9737 33.4891 14.2111 31.2859 14.2111ZM17.6259 8.04204C15.9073 8.04204 14.5413 6.67604 14.5413 4.95752C14.5413 3.239 15.9073 1.87299 17.6259 1.87299C19.3444 1.87299 20.7104 3.239 20.7104 4.95752C20.7104 6.67604 19.3444 8.04204 17.6259 8.04204ZM31.2859 21.2614C29.5674 21.2614 28.2014 19.8954 28.2014 18.1769C28.2014 16.4584 29.5674 15.0924 31.2859 15.0924C33.0044 15.0924 34.3704 16.4584 34.3704 18.1769C34.3704 19.8954 33.0044 21.2614 31.2859 21.2614Z"
        fill="#303030"
      />
      <path
        d="M17.6259 22.1426C19.8291 22.1426 21.5917 20.38 21.5917 18.1768C21.5917 15.9735 19.8291 14.2109 17.6259 14.2109C15.4226 14.2109 13.66 15.9735 13.66 18.1768C13.66 20.38 15.4226 22.1426 17.6259 22.1426ZM17.6259 15.0922C19.3444 15.0922 20.7104 16.4582 20.7104 18.1768C20.7104 19.8953 19.3444 21.2613 17.6259 21.2613C15.9073 21.2613 14.5413 19.8953 14.5413 18.1768C14.5413 16.4582 15.9073 15.0922 17.6259 15.0922Z"
        fill="#303030"
      />
      <path
        d="M3.96582 35.3623C6.16905 35.3623 7.93164 33.5997 7.93164 31.3965C7.93164 29.1932 6.16905 27.4307 3.96582 27.4307C1.76259 27.4307 0 29.1932 0 31.3965C0 33.5997 1.76259 35.3623 3.96582 35.3623ZM3.96582 28.312C5.68434 28.312 7.05034 29.678 7.05034 31.3965C7.05034 33.115 5.68434 34.481 3.96582 34.481C2.2473 34.481 0.881293 33.115 0.881293 31.3965C0.881293 29.678 2.2473 28.312 3.96582 28.312Z"
        fill="#303030"
      />
      <path
        d="M31.2859 27.4305C29.2589 27.4305 27.5845 28.9728 27.3641 30.9557H21.5476C21.3273 28.9728 19.6528 27.4305 17.6259 27.4305C16.2158 27.4305 14.982 28.1796 14.2769 29.2812L6.34531 21.3496C7.31473 20.6445 7.93164 19.4548 7.93164 18.1769C7.93164 16.1499 6.38937 14.4755 4.40646 14.2552V8.87927C6.38937 8.65895 7.93164 6.98449 7.93164 4.95752C7.93164 2.75429 6.16905 0.991699 3.96582 0.991699C1.76259 0.991699 0 2.75429 0 4.95752C0 6.98449 1.54226 8.65895 3.52517 8.87927V14.2111C1.54226 14.4314 0 16.1059 0 18.1328C0 20.3361 1.76259 22.0987 3.96582 22.0987C4.53866 22.0987 5.06743 21.9665 5.55215 21.7902L13.8804 30.1184C13.7482 30.515 13.66 30.9557 13.66 31.3963C13.66 33.5995 15.4226 35.3621 17.6259 35.3621C19.6528 35.3621 21.3273 33.8199 21.5476 31.837H27.3201C27.5404 33.8199 29.2149 35.3621 31.2418 35.3621C33.4451 35.3621 35.2077 33.5995 35.2077 31.3963C35.2077 29.1931 33.4891 27.4305 31.2859 27.4305ZM0.881293 4.95752C0.881293 3.239 2.2473 1.87299 3.96582 1.87299C5.68434 1.87299 7.05034 3.239 7.05034 4.95752C7.05034 6.67604 5.68434 8.04204 3.96582 8.04204C2.2473 8.04204 0.881293 6.67604 0.881293 4.95752ZM0.881293 18.1769C0.881293 16.4584 2.2473 15.0924 3.96582 15.0924C5.68434 15.0924 7.05034 16.4584 7.05034 18.1769C7.05034 19.8954 5.68434 21.2614 3.96582 21.2614C2.2473 21.2614 0.881293 19.8954 0.881293 18.1769ZM17.6259 34.4808C15.9073 34.4808 14.5413 33.1148 14.5413 31.3963C14.5413 29.6778 15.9073 28.3118 17.6259 28.3118C19.3444 28.3118 20.7104 29.6778 20.7104 31.3963C20.7104 33.1148 19.3444 34.4808 17.6259 34.4808ZM31.2859 34.4808C29.5674 34.4808 28.2014 33.1148 28.2014 31.3963C28.2014 29.6778 29.5674 28.3118 31.2859 28.3118C33.0044 28.3118 34.3704 29.6778 34.3704 31.3963C34.3704 33.1148 33.0044 34.4808 31.2859 34.4808Z"
        fill="#303030"
      />
    </svg>
  );
};

export default CompanyLogo;