
|NO  | VERBS  | ENDPOINTS                            | STATUS   | ACCESS                   | DESCRIPTION                             |
|----|--------|--------------------------------------|----------|--------------------------|-----------------------------------------|
| 1  | POST   | /login-farmer                        |  200 OK  | public                   | login to the farmer account             |
| 2  | POST   | /reset-link                          |  200 OK  | public                   | request a link to reset                 |
| 3  | POST   | /reset-password                      |  200 OK  | private                  | reset account password                  |
| 4  | POST   | /reset-userCode                      |  200 OK  | private                  | reset account user code                 |
| 5  | GET    | /count-cattles                       |  200 OK  | private                  | count all user cattles                  |
| 6  | GET    | /view-cattle/:cattleId               |  200 OK  | private                  | view a single cattle details            |
| 7  | PATCH  | /upate-cattle/:cattleId/:milkingId   |  200 OK  | private                  | update cattle details with milking      |
| 8  | GET    | /view-farmer                         |  200 OK  | private                  | view farmer details                     |
| 9  | PATCH  | /upate-farmer                        |  200 OK  | private                  | update a farmer profile                 |
| 10 | GET    | /farmer-view-appointment/:appointId  |  200 OK  | private                  | farmer view a single appointment details|
| 11 | GET    | /farmer-view-past-appointments       |  200 OK  | private                  | farmer view a past held appointments    |
| 12 | GET    | /farmer-view-upcoming-appointments   |  200 OK  | private                  | farmer view a upcoming appointments     |
| 13 | POST   |                                      |  200 OK  | private                  |                                         |
| 14 | POST   |                                      |  200 OK  | private                  |                                         |
| 15 | POST   |                                      |  200 OK  | private                  |                                         |
| 16 | GET    |                                      |  200 OK  | private                  |                                         |
| 17 | GET    |                                      |  200 OK  | private                  |                                         |
| 18 | GET    |                                      |  200 OK  | private                  |                                         |
| 19 | GET    |                                      |  200 OK  | private                  |                                         |
| 20 | GET    |                                      |  200 OK  | private                  |                                         |
| 21 | GET    |                                      |  200 OK  | private                  |                                         |
| 22 | GET    |                                      |  200 OK  | private                  |                                         |