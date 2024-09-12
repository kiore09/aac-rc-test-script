// ===========================================================================
// This sample code is created by the Architecture as Code team at TELUS.
// The main purpose of this code is to give developers at TELUS a reference
// and starting point for their projects.
// As a TELUS Developer, you may update your copy of this code per your needs.
// ===========================================================================
// Last updated: 02-28-2024
// Description: sampleData for file download implementation
// ===========================================================================

const sampleData = [
  { "id": 1, "file_name": "file_1.txt", "date": "2024-01-01", "file_content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { "id": 2, "file_name": "file_2.txt", "date": "2024-01-02", "file_content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
  { "id": 3, "file_name": "file_3.txt", "date": "2024-01-03", "file_content": "Curabitur euismod sem vel felis efficitur, ut auctor libero condimentum." },
  { "id": 4, "file_name": "file_4.txt", "date": "2024-01-04", "file_content": "Fusce eget tortor non ligula luctus dapibus." },
  { "id": 5, "file_name": "file_5.txt", "date": "2024-01-05", "file_content": "Integer ultricies elit in lacus lacinia, id tristique nunc scelerisque." },
  { "id": 6, "file_name": "file_6.txt", "date": "2024-01-06", "file_content": "Suspendisse auctor mauris ut justo efficitur, ac iaculis metus tristique." },
  { "id": 7, "file_name": "file_7.txt", "date": "2024-01-07", "file_content": "Vestibulum vehicula mi in purus ullamcorper, a vulputate lacus bibendum." },
  { "id": 8, "file_name": "file_8.txt", "date": "2024-01-08", "file_content": "Quisque a nulla vel justo convallis semper nec non velit." },
  { "id": 9, "file_name": "file_9.txt", "date": "2024-01-09", "file_content": "Cras dapibus turpis a urna dictum, vel tempus augue auctor." },
  { "id": 10, "file_name": "file_10.txt", "date": "2024-01-10", "file_content": "Nunc ac elit id velit consectetur eleifend et ac ipsum." },
  { "id": 11, "file_name": "file_11.txt", "date": "2024-01-11", "file_content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
  { "id": 12, "file_name": "file_12.txt", "date": "2024-01-12", "file_content": "Curabitur euismod sem vel felis efficitur, ut auctor libero condimentum." },
  { "id": 13, "file_name": "file_13.txt", "date": "2024-01-13", "file_content": "Fusce eget tortor non ligula luctus dapibus." },
  { "id": 14, "file_name": "file_14.txt", "date": "2024-01-14", "file_content": "Integer ultricies elit in lacus lacinia, id tristique nunc scelerisque." },
  { "id": 15, "file_name": "file_15.txt", "date": "2024-01-15", "file_content": "Suspendisse auctor mauris ut justo efficitur, ac iaculis metus tristique." },
  { "id": 16, "file_name": "file_16.txt", "date": "2024-01-16", "file_content": "Vestibulum vehicula mi in purus ullamcorper, a vulputate lacus bibendum." },
  { "id": 17, "file_name": "file_17.txt", "date": "2024-01-17", "file_content": "Quisque a nulla vel justo convallis semper nec non velit." },
  { "id": 18, "file_name": "file_18.txt", "date": "2024-01-18", "file_content": "Cras dapibus turpis a urna dictum, vel tempus augue auctor." },
  { "id": 19, "file_name": "file_19.txt", "date": "2024-01-19", "file_content": "Nunc ac elit id velit consectetur eleifend et ac ipsum." },
  { "id": 20, "file_name": "file_20.txt", "date": "2024-01-20", "file_content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { "id": 21, "file_name": "file_21.txt", "date": "2024-01-21", "file_content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
  { "id": 22, "file_name": "file_22.txt", "date": "2024-01-22", "file_content": "Curabitur euismod sem vel felis efficitur, ut auctor libero condimentum." },
  { "id": 23, "file_name": "file_23.txt", "date": "2024-01-23", "file_content": "Fusce eget tortor non ligula luctus dapibus." },
  { "id": 24, "file_name": "file_24.txt", "date": "2024-01-24", "file_content": "Integer ultricies elit in lacus lacinia, id tristique nunc scelerisque." },
  { "id": 25, "file_name": "file_25.txt", "date": "2024-01-25", "file_content": "Suspendisse auctor mauris ut justo efficitur, ac iaculis metus tristique." },
  { "id": 26, "file_name": "file_26.txt", "date": "2024-01-26", "file_content": "Vestibulum vehicula mi in purus ullamcorper, a vulputate lacus bibendum." },
  { "id": 27, "file_name": "file_27.txt", "date": "2024-01-27", "file_content": "Quisque a nulla vel justo convallis semper nec non velit." },
  { "id": 28, "file_name": "file_28.txt", "date": "2024-01-28", "file_content": "Cras dapibus turpis a urna dictum, vel tempus augue auctor." },
  { "id": 29, "file_name": "file_29.txt", "date": "2024-01-29", "file_content": "Nunc ac elit id velit consectetur eleifend et ac ipsum." },
  { "id": 30, "file_name": "file_30.txt", "date": "2024-01-30", "file_content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { "id": 31, "file_name": "file_31.txt", "date": "2024-01-31", "file_content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
  { "id": 32, "file_name": "file_32.txt", "date": "2024-02-01", "file_content": "Curabitur euismod sem vel felis efficitur, ut auctor libero condimentum." },
  { "id": 33, "file_name": "file_33.txt", "date": "2024-02-02", "file_content": "Fusce eget tortor non ligula luctus dapibus." },
  { "id": 34, "file_name": "file_34.txt", "date": "2024-02-03", "file_content": "Integer ultricies elit in lacus lacinia, id tristique nunc scelerisque." },
  { "id": 35, "file_name": "file_35.txt", "date": "2024-02-04", "file_content": "Suspendisse auctor mauris ut justo efficitur, ac iaculis metus tristique." },
  { "id": 36, "file_name": "file_36.txt", "date": "2024-02-05", "file_content": "Vestibulum vehicula mi in purus ullamcorper, a vulputate lacus bibendum." },
  { "id": 37, "file_name": "file_37.txt", "date": "2024-02-06", "file_content": "Quisque a nulla vel justo convallis semper nec non velit." },
  { "id": 38, "file_name": "file_38.txt", "date": "2024-02-07", "file_content": "Cras dapibus turpis a urna dictum, vel tempus augue auctor." },
  { "id": 39, "file_name": "file_39.txt", "date": "2024-02-08", "file_content": "Nunc ac elit id velit consectetur eleifend et ac ipsum." },
  { "id": 40, "file_name": "file_40.txt", "date": "2024-02-09", "file_content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { "id": 41, "file_name": "file_41.txt", "date": "2024-02-10", "file_content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
  { "id": 42, "file_name": "file_42.txt", "date": "2024-02-11", "file_content": "Curabitur euismod sem vel felis efficitur, ut auctor libero condimentum." },
  { "id": 43, "file_name": "file_43.txt", "date": "2024-02-12", "file_content": "Fusce eget tortor non ligula luctus dapibus." },
  { "id": 44, "file_name": "file_44.txt", "date": "2024-02-13", "file_content": "Nunc ac elit id velit consectetur eleifend et ac ipsum." },
  { "id": 45, "file_name": "file_45.txt", "date": "2024-02-14", "file_content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
  { "id": 46, "file_name": "file_46.txt", "date": "2024-02-15", "file_content": "Curabitur euismod sem vel felis efficitur, ut auctor libero condimentum." },
  { "id": 47, "file_name": "file_47.txt", "date": "2024-02-16", "file_content": "Fusce eget tortor non ligula luctus dapibus." },
  { "id": 48, "file_name": "file_48.txt", "date": "2024-02-17", "file_content": "Integer ultricies elit in lacus lacinia, id tristique nunc scelerisque." },
  { "id": 49, "file_name": "file_49.txt", "date": "2024-02-18", "file_content": "Suspendisse auctor mauris ut justo efficitur, ac iaculis metus tristique." },
  { "id": 50, "file_name": "file_50.txt", "date": "2024-02-19", "file_content": "Vestibulum vehicula mi in purus ullamcorper, a vulputate lacus bibendum." }
]

export default sampleData;