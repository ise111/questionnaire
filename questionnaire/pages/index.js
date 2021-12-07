import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Container from '@mui/material/Container'
import Input from '@mui/material/Input'
import firebase from './libs/firebase'
import { nanoid } from 'nanoid'

export default function Home() {

const { register, formState: { errors }, handleSubmit, watch } = useForm()
const watchQuestions = watch(['question1', 'question2'])

useEffect(() => {
  firebase.firestore().collection('answers')
    .onSnapshot((snapshot) => {
    const answers = snapshot.docs.map(doc => {
      return doc.data()
    })
  })

  const subscription = watch((value, { name, type }) => console.log(value, name, type));
  return () => subscription.unsubscribe();

}, [watchQuestions]);


  const onSubmit = data => {
    console.log(data.name)
    console.log(data.birthday)
    console.log(data.question1)
    console.log(errors.birthday)
    console.log(watchQuestions)

    firebase.firestore().collection('answers')
    .add({
      id: nanoid(),
      user: data.name,
      birthday: data.birthday,
      question1: data.question1,
      question2: data.question2,
      kinds: data.kinds
    })
    
  }

  return (
    <>
    <Container>
    <h1>プログラミング学習に関するアンケート</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Q1. 名前を入力して下さい（匿名可）。</label>
        <Input id='name' type="name" {...register('name')} />
      </div>
      <div>
        <label htmlFor="birthday">Q2. 生年月日を入力して下さい（例： 19900101）。</label>
        <Input id='birthday' type="number" {...register('birthday', {required: true, pattern: /^[1-2][0,9][0-9][0-9][0-1][0-9][0-3][0-9]$/})} />  
        {errors.birthday?.type === "required" && <span>このフィールドは回答必須です。</span>}
        {errors.birthday?.type === "pattern" && <span>例に沿って生年月日を回答ください。</span>}
      </div>
      <div>
        <span>Q3. 現在、プログラミングを学習していますか？</span>
        <input id='yes' {...register('question1', {required: true})} type="radio" name='question1' value='true' />
        <label htmlFor="yes">はい</label>
        <input id='no' {...register('question1', {required: true})} type="radio" name='question1' value='false' />
        <label htmlFor="no">いいえ</label>
        <input id='unknown' {...register('question1', {required: true})} type="radio" name='question1' value='unknown' />
        <label htmlFor="unknown">分からない</label>
        {errors.question1 && <span>このフィールドは回答必須です。</span>}
      </div>
      <div>
        <span>Q4. これまでに、プログラミングを学習したことがありますか？</span>
        <input id='yes' {...register('question2', {required: true})} type="radio" name='question2' value='true' />
        <label htmlFor="yes">はい</label>
        <input id='no' {...register('question2', {required: true})} type="radio" name='question2' value='false' />
        <label htmlFor="no">いいえ</label>
        <input id='unknown' {...register('question2', {required: true})} type="radio" name='question2' value='unknown' />
        <label htmlFor="unknown">分からない</label>
        {errors.question2 && <span>このフィールドは回答必須です。</span>}
      </div>
      <div>
        {(() => {
          if (watchQuestions[0] === 'true' || watchQuestions[1] === 'true') {
            return (
              <>
              <label htmlFor='kinds'>Q5. 今まで学習したことのあるプログラミング言語をすべて教えてください。</label>
               <textarea id='kinds' {...register('kinds')} />
              </>
            ) 
          }
        }) ()}
      {/* {watchQuestions[0] === 'true' , watchQuestions[1] === 'true' && <input type='text' {...register('kinds')} />} */}
      </div>
      <input type="submit" value='アンケートを提出する' />
    </form>
    </Container>
    </>
  )
}
