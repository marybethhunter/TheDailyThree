# ☁ TheDailyThree - E16 Final Full Stack Capstone!

## Get Started:


```javascript
 $ git clone git@github.com:marybethhunter/TheDailyThree.git
 $ cd TheDailyThree
```

## About
* Gratitude helps people feel more positive emotions, relish good experiences, improve their health, deal with adversity, and build strong relationships. We need more of this in our daily lives. Enter The Daily Three, a daily gratitude and mood tracker app.

## Features: 

#### **Authenticated Users**:
* Users can log into The Daily Three with their Google account and add a daily gratitude entry and mood. They can see a list of all of their past entries, as well as see the details of each past entry. Any entry can also be deleted.
* Users can create, edit, view the details of, and delete custom goals. They can toggle the goal as completed or uncompleted as they make or do not make progress.
* Users can create, edit, view the details of, and delete custom vision boards. They can also add images to their vision boards that they can delete individually.
#### **Chart.js**: 
* Users can access the Mood Tracker view and see a Chart.js doughnut graph of their moods. This can be used to see their baseline/most common mood and maybe even see it improve over time as the ‘happier’ moods increase in quantity.

## Loom Walkthrough:

## Relevant Links:
* [FigJam](https://www.figma.com/file/PJUBo3483VLoS8xX5NKurp/The-Daily-Three?node-id=0%3A1):

<img width="590" alt="2022-05-16" src="https://user-images.githubusercontent.com/86667443/168712328-c5c08932-6058-4b00-83a4-8d016dde493b.png">

* [ERD](https://dbdiagram.io/d/627712037f945876b6d5241b)
* [Project Board](https://github.com/marybethhunter/TheDailyThree/projects/1)

## Code Snippets:

```javascript
useEffect(() => {
    let isMounted = true;
    getMostRecentEntryByUid(uid).then((entry) => {
      setNewestEntry(entry);
    });
    const currentDate = new Date().toDateString();
    getAllUserEntriesByUid(uid).then((entriesArray) => {
      if (isMounted) setEntries(entriesArray);
      if (
        entriesArray.length !== 0 &&
        newestEntry.date === currentDate.toString()
      ) {
        setCanAddEntry(false);
      }
      if (
        entriesArray.length !== 0 &&
        newestEntry.date !== currentDate.toString()
      ) {
        setCanAddEntry(true);
      } else if (entriesArray.length === 0) {
        setCanAddEntry(true);
      }
    });
  }, [canAddEntry, uid, entries.length]);
```

## Technology Used:
* Javascript
* React
* Firebase
* C#
* SQL
* Swagger
* Figma
* Axios
* Reactstrap
* Styled Components
* Chart.js

## Screenshots:

![2022-05-28](https://user-images.githubusercontent.com/86667443/170832207-239132f5-79a2-46ea-a987-3d027d49a9cb.png)
![2022-05-28 (1)](https://user-images.githubusercontent.com/86667443/170832232-c34aa62d-a4a9-493d-a73c-02a32fa8145d.png)
![2022-05-28 (2)](https://user-images.githubusercontent.com/86667443/170832260-ca2af8a2-69e3-447b-ba31-740c697fdd2e.png)
![2022-06-01](https://user-images.githubusercontent.com/86667443/171479527-afdb3f52-92d6-45bc-bc00-b1fff6389c6a.png)
![2022-06-01 (1)](https://user-images.githubusercontent.com/86667443/171479545-87fd9087-c87c-4332-996f-f41a92d39eca.png)
![2022-06-14](https://user-images.githubusercontent.com/86667443/173705266-29156019-5ef5-4341-a0d1-7a3c975f773d.png)

## Contributors: Mary Beth Hunter, [Github](https://github.com/marybethhunter), [Portfolio](https://marybeth-hunter.com/), [LinkedIn](www.linkedin.com/in/marybhunter1)
